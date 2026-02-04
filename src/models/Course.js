const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true 
    },
    description: {
        type: String,   
        required: [true, "Description is required"]
    },
    instructor: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Instructor reference is required"]            
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ['Web Development', 'Data Science', 'Design', 'Marketing', 'Other']
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    duration: {
        type: Number, 
        required: [true, "Duration is required"]
    },
    price: {   
        type: Number,
        required: [true, "Price is required"],
        default: 0
    },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;