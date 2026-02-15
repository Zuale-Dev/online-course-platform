const express = require('express');
const router = express.Router();
const { 
    createEnrollment, 
    getEnrollments, 
    deleteEnrollment 
} = require('../controllers/enrollmentController');

const { protect } = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.use(protect);

router.route('/')
    .post(createEnrollment) 
    .get(authorize('admin'), getEnrollments); 

router.route('/:id')
    .delete(deleteEnrollment); 

module.exports = router;