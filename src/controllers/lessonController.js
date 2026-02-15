const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

exports.createLesson = async (req, res) => {
    try {
        const { title, content, course, videoUrl } = req.body;

        const foundCourse = await Course.findById(course);
        if (!foundCourse) {
            return res.status(404).json({ success: false, message: "Kursi nuk u gjet" });
        }

        if (foundCourse.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ 
                success: false, 
                message: "Nuk keni autorizim për të shtuar leksione në këtë kurs" 
            });
        }

        const lesson = await Lesson.create({
            title,
            content,
            course,
            videoUrl
        });

        res.status(201).json({
            success: true,
            data: lesson
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getCourseLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find({ course: req.params.courseId })
            .populate('course', 'title');

        res.status(200).json({
            success: true,
            count: lessons.length,
            data: lessons
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.updateLesson = async (req, res) => {
    try {
        let lesson = await Lesson.findById(req.params.id).populate('course');

        if (!lesson) {
            return res.status(404).json({ success: false, message: "Leksioni nuk u gjet" });
        }

        if (lesson.course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: "Nuk keni autorizim" });
        }

        lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators: true 
        });

        res.status(200).json({ success: true, data: lesson });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id).populate('course');

        if (!lesson) {
            return res.status(404).json({ success: false, message: "Leksioni nuk u gjet" });
        }

        if (lesson.course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: "Nuk keni autorizim" });
        }

        await lesson.deleteOne();

        res.status(200).json({ success: true, message: "Leksioni u fshi me sukses" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};