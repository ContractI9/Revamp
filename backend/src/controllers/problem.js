const problem = require("../models/problem");
const course = require("../models/course");

exports.createProblem = async (req, res) => {
  const courseId = req.body.courseId;
  const user = req.body.userId;
  const type = req.body.type;
  const description = req.body.description;

  const foundCourse = await course.findById(courseId);
  if (!foundCourse) {
    return res.status(404).send({ message: "Course not found" });
  }

  const newProblem = new problem({
    course: courseId,
    courseName: foundCourse.courseTitle,
    user: user,
    userName:"httzabat lma n3ml l token",
    type: type,
    description: description,
  });
  try {
    await newProblem.save();
    res.status(201).send("Problem created successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProblems = async (req, res) => {
  const status=req.query.status;
  const type=req.query.type;

  let query1 = {};
  let query2 = {};
  if (status) {
    query1 = { status: { $regex: status, $options: "i" } };
  }

  if (type) {
    query2 = { type: { $regex: type, $options: "i" } };
  }
  const query = { $and: [query1, query2] };
  try {
    const problems = await problem.find(query).sort({ date: -1 });
    res.send(problems);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProblem = async (req, res) => {
  const _id = req.params.id;
  try {
    const foundProblem = await problem.findById(_id);
    if (!foundProblem) {
      return res.status(404).send();
    }
     if (foundProblem.seen === false) {
      //if(req.user.role === "ADMIN"){
     //  foundProblem.seen = true;
      await foundProblem.save();
      //}
    }
    res.send(foundProblem);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteProblem = async (req, res) => {
  const _id = req.params.id;
  try {
    const foundProblem = await problem.findByIdAndDelete(_id);
    if (!foundProblem) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Problem deleted successfully", foundProblem });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateProblem = async (req, res) => {
  const status = req.body.status;
  const seen = req.body.seen;
  const _id = req.params.id;
  try {
    const foundProblem = await problem.findByIdAndUpdate(
      _id,
      {
        status,
        seen,
      },
      { new: true }
    );
    if (!foundProblem) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Problem updated successfully", foundProblem });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.followUpProblem = async (req, res) => {
  const followUpComment = req.body.followUpComment;
  const userId=req.body.userId;
  const _id = req.params.id;
  try {
    const foundProblem = await problem.findOne({ _id, user: userId });
    if (!foundProblem) {
      return res.status(400).send("Problem doesn't belong to user");
    }
    if (foundProblem.status == "resolved") {
      return res.status(400).send({ message: "Problem already resolved" });
    }
    foundProblem.followUpComment = followUpComment;
    await foundProblem.save();
    res.status(200).send("Follow up comment added successfully");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

exports.getUserProblems = async (req, res) => {
    const _id = req.params.id;
    const status=req.query.status;
  const type=req.query.type;

  let query1 = {};
  let query2 = {};
  if (status) {
    query1 = { status: { $regex: status, $options: "i" } };
  }
  if (type) {
    query2 = { type: { $regex: type, $options: "i" } };
  }
  const query = { $and: [query1, query2,{ user: _id }] };
    try {
        const problems = await problem.find(query).sort({ date: -1 });
        res.send(problems);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};

exports.getCourseProblems = async (req, res) => {
  const _id = req.params.id;
  const status=req.query.status;
const seen=req.query.seen;
const type=req.query.type;

let query1 = {};
let query2 = {};
let query3 = {};
if (status) {
  query1 = { status: { $regex: status, $options: "i" } };
}
if (seen) {  
    query2 = { seen: seen };
}
if (type) {
  query3 = { type: { $regex: type, $options: "i" } };
}
const query = { $and: [query1, query2, query3,{ course: _id }] };
    try {
        const problems = await problem.find(query).sort({ date: -1 });
        res.send(problems);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};


