const express = require('express');
const router = express.Router();
const { 
    createLesson, 
    getCourseLessons, 
    updateLesson, 
    deleteLesson 
} = require('../controllers/lessonController');

const { protect } = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.get('/course/:courseId', protect, getCourseLessons);

router.post('/', protect, authorize('instructor', 'admin'), createLesson);
router.put('/:id', protect, authorize('instructor', 'admin'), updateLesson);
router.delete('/:id', protect, authorize('instructor', 'admin'), deleteLesson);

module.exports = router;