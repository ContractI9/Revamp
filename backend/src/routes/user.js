const router = require('express').Router();
const userController=require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/login', userController.login);

router.patch('/updateuser/:id', userController.updateUser);

router.patch("/changepassword/:id", userController.changePassword);

router.post("/forgetpassword", userController.forgetPassword);

router.patch("/resetpassword/:id",auth.validateToken, userController.resetPassword);

router.post('/register', userController.createUser);

router.post('/logout',userController.logout);

router.post('/enroll',userController.registerToCourse);

router.patch('/opensource/:id',userController.openSource);

router.get('/progress/:id',userController.getProgress);

router.patch('/notes/:id',userController.addNotes);

router.post('/solveexam',userController.solveExam);

router.get('/mycourses/:id',userController.getRegisteredCourses);


module.exports=router;