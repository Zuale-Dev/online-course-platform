const Enrollment = require("../models/Enrollment");

exports.createEnrollment = async (req, res) => {
    try {
        const { course } = req.body;
        const userId = req.user.id; 

        const existingEnrollment = await Enrollment.findOne({ user: userId, course });
        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: "Jeni i regjistruar tashmë në këtë kurs."
            });
        }

        const enrollment = await Enrollment.create({ 
            user: userId, 
            course 
        });

        res.status(201).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getEnrollments = async (req, res) => {
    try {
        let query;

        if (req.user.role !== 'admin') {
            query = Enrollment.find({ user: req.user.id });
        } else {
            query = Enrollment.find();
        }

        const enrollments = await query
            .populate('user', 'name email')
            .populate('course', 'title price');

        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);

        if (!enrollment) {
            return res.status(404).json({ success: false, message: "Regjistrimi nuk u gjet" });
        }

        if (enrollment.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: "Nuk keni autorizim" });
        }

        await enrollment.deleteOne();
        res.status(200).json({ success: true, message: "U çregjistruat me sukses" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};