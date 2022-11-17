const course=require('../models/course');
const user = require('../models/user');

exports.updateUser = (req, res) => {
    const id = req.params.id;
    user.findByIdAndUpdate(id, req.body
    , { useFindAndModify: false ,new: true})
    .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`,
            });
        } else res.send({ message: "user was updated successfully." });
        })
    .catch(err => {
        res.status(500).send({
        message: "Error updating user with id=" + id,
        });
    });

};

//can rate any instructor, fix later
exports.rateInstructor = async (req, res) => {
    const instructorId = req.params.id;
    const userId = req.body.userId;
    const rating = req.body.rating;
    const review = req.body.review;
    try {
        const foundInstructor=await user
        .findById(instructorId)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot find instructor with id=${instructorId}. Maybe instructor was not found!`,
                });
            } 
        });
        const reviewCount=foundInstructor.reviews.length;
        foundInstructor.rating = (reviewCount/reviewCount+1 )* foundCourse.rating + (1/reviewCount+1 )*rating;
        foundInstructor.reviews.push({user:userId,rating:rating,review:review});
        foundInstructor.save();
        res.status(200).send({
            message: "Instructor was rated successfully.",
        });
    }
    catch (err) {   
        res.status(500).send({
            message: err.message || "Some error occurred while rating instructor.",
        });
    }

};




