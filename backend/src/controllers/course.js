const course = require("../models/course");
const instructor = require("../models/instructor");
const currencyConverter = require("../helper/currencyconverter");
const { json } = require("body-parser");

exports.getAllCourses = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.pageSize || 10;
  const search = req.query.search || "";
  const minPrice = req.query.minPrice || 0;
  const maxPrice = req.query.maxPrice || 100000;
  const rating = req.query.rating || 0;
  const subjects = req.query.subject;
  let query = {};
  if (subjects) {
    query = { subject: { $in: subjects } };
  }

  const allCourses = await course
    .find({
      $and: [
        query,
        { coursePrice: { $gte: minPrice } },
        { coursePrice: { $lte: maxPrice } },
        { rating: { $gte: rating } },
        {
          $or: [
            { courseTitle: { $regex: search, $options: "i" } },
            { subject: { $regex: search, $options: "i" } },
            { instructorName: { $regex: search, $options: "i" } },
          ],
        },
      ],
    })
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .select({
      _id: 1,
      courseTitle: 1,
      totalHours: 1,
      price: 1,
      coursePrice: 1,
      courseImage: 1,
      rating: 1,
      instructor: 1,
      instructorName: 1,
      subject: 1,
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching courses failed!",
      });
    });
  const countryCode = req.query.CC || "US";
  const rate = await currencyConverter.convertCurrency(countryCode);
  allCourses.forEach((course) => {
    course.coursePrice = course.coursePrice * rate;
  });
  res.status(200).json({
    message: "Courses fetched successfully!",
    courses: allCourses,
  });
};

exports.getCourse = async (req, res, next) => {
  await course
    .findById(req.params.id)
    .then((course) => {
      if (course) {
        res.status(200).json(course);
      } else {
        res.status(404).json({ message: "Course not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching course failed!",
      });
    });
};

exports.updateCourse = async (req, res, next) => {
  await course
    .findByIdAndUpdate(req.params.id, req.body)
    .then((course) => {
      if (course) {
        res.status(200).json({ message: "Course updated successfully!" });
      } else {
        res.status(404).json({ message: "Course not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not update course!",
      });
    });
};

exports.deleteCourse = async (req, res, next) => {
  await course
    .findByIdAndDelete(req.params.id)
    .then((course) => {
      if (course) {
        res.status(200).json({ message: "Course deleted successfully!" });
      } else {
        res.status(404).json({ message: "Course not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Could not delete course!",
      });
    });
};

exports.createCourse = async (req, res, next) => {
  const instructorId = req.params.id;
  const foundInstructor = await instructor.findById(instructorId);
  const instructorName =
    foundInstructor.firstName + " " + foundInstructor.lastName;
  const newCourse = new course({
    courseTitle: req.body.courseTitle,
    courseDescription: req.body.courseDescription,
    totalHours: req.body.totalHours,
    coursePrice: req.body.coursePrice,
    courseImage: req.body.courseImage,
    instructor: instructorId,
    instructorName: instructorName,
    discount: req.body.discount,
    rating: req.body.rating,
    subject: req.body.subject,
    reviews: req.body.reviews,
    requirements: req.body.requirements,
    views: req.body.views,
    certificate: req.body.certificate,
    summary: req.body.summary,
    subtitles: req.body.subtitles,
  });

  await newCourse
    .save()
    .then((createdCourse) => {
      res.status(201).json({
        message: "Course added successfully",
        course: {
          id: createdCourse._id,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Creating a course failed!",
        error: error,
      });
    });

  foundInstructor.courses.push(newCourse.id);
  await foundInstructor.save();
};

exports.searchCoursesByInstructor = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.pageSize || 10;
  const search = req.query.search || "";
  const minPrice = req.query.minPrice || 0;
  const maxPrice = req.query.maxPrice || 100000;
  const subjects = req.query.subject;
  let query = {};
  if (subjects) {
    query = { subject: { $in: subjects } };
  }
  await course
    .find({
      $and: [
        query,
        { instructor: req.params.id },
        { coursePrice: { $gte: minPrice } },
        { coursePrice: { $lte: maxPrice } },
        {
          $or: [
            { courseTitle: { $regex: search, $options: "i" } },
            { subject: { $regex: search, $options: "i" } },
            { instructorName: { $regex: search, $options: "i" } },
          ],
        },
      ],
    })
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .select({
      _id: 1,
      courseTitle: 1,
      totalHours: 1,
      price: 1,
      coursePrice: 1,
      courseImage: 1,
      rating: 1,
      instructor: 1,
      instructorName: 1,
      subject: 1,
    })
    .then((courses) => {
      res.status(200).json({
        message: "Courses fetched successfully!",
        courses: courses,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching courses failed!",
      });
    });
};
