const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
    try {
        req.body.instructor = req.user.id; 

        const course = await Course.create(req.body);
        res.status(201).json({ success: true, data: course });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor', 'name email');
        res.status(200).json({ success: true, count: courses.length, data: courses });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('instructor', 'name');
        if (!course) return res.status(404).json({ success: false, message: "Kursi nuk u gjet" });
        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ success: false, message: "Kursi nuk u gjet" });

        if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: "Nuk keni autorizim për këtë veprim" });
        }

        course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: course });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) return res.status(404).json({ success: false, message: "Kursi nuk u gjet" });
        
        if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: "Nuk keni autorizim" });
        }

        await course.deleteOne();
        res.status(200).json({ success: true, message: "Kursi u fshi me sukses" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};