const express = require('express');
const router = express.Router();


const coursesController = require('../controller/courses');



router.get('/api/courses', coursesController.getCourses);





module.exports = router;