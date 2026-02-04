const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    user: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User reference is required"]
    },
    course: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, "Course reference is required"]
    },
    status: 
    {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    }
}, { timestamps: true }); 

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollment;