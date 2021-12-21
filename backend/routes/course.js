const express = require('express');
const router = express.Router();


const courseController = require('../controller/course');



router.get('/api/courses', courseController.getCourses);
router.get('/api/course/:courseID', courseController.getCourse);
router.get('/api/course/:courseID/reviews', courseController.getCourseReviews);







module.exports = router;