const Doctor = require('../models/Doctor');
const User = require('../models/User');

const registerDoctor = async (req, res) => {
    const { specialization, description, location, experience, workingHours, fee, availability, certificates, services, appointmentSlots, approvedStatus } = req.body;

    try {
        const existingUser = await User.findById(req.UserId);

        if (!existingUser || existingUser.type !== "Doctor" || existingUser._id !== req.UserId)
            return res.status(404).json({ message: "Wrong User" });

        const result = await Doctor.create({ id: req.UserId, specialization, description, location, experience, workingHours, fee, availability, certificates, services, appointmentSlots, approvedStatus });

        return res.status(201).json({ result });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    registerDoctor
};