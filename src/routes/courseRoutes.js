const express = require('express');
const router = express.Router();
const { 
    createCourse, 
    getCourses, 
    getCourse,
    updateCourse,
    deleteCourse 
} = require('../controllers/courseController');

const { protect } = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.route('/')
    .get(getCourses) 
    .post(protect, authorize('instructor', 'admin'), createCourse); 

router.route('/:id')
    .get(getCourse) 
    .put(protect, authorize('instructor', 'admin'), updateCourse) 
    .delete(protect, authorize('admin'), deleteCourse); 

module.exports = router;