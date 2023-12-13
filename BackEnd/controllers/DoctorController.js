const Doctor = require('../models/Doctor');
const User = require('../models/User');

const registerDoctor = async (req, res) => {
    const { specialization, description, location, experience, workingHours, fee, services, appointmentSlots} = req.body;

    const files = req.files.certificates;
    const fileNames = [];
    for (let i = 0; i < files.length; i++) {
        const fileName = Date.now() + files[i].name;
        fileNames.push(fileName);

        files[i].mv(`../uploads/${fileName}`, async (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ msg: "Error occured in uploading certificates" });
            }
        });
    }

    try {
        const existingUser = await User.findById(req.UserId);

        if (!existingUser || existingUser.type !== "Doctor" || existingUser._id !== req.UserId)
            return res.status(404).json({ message: "Wrong User" });

        const certificates = [];

        for (let i = 0; i < files.length; i++) {
            const certificate = {
                name: files[i].name,
                description: req.body.certificates[i].description,
                issueDate: req.body.certificates[i].issueDate,
                expiryDate: req.body.certificates[i].expiryDate,
                file: fileNames[i]
            };
            certificates.push(certificate);
        }

        const result = await Doctor.create({ id: req.UserId, specialization, description, location, experience, workingHours, fee, certificates, services, appointmentSlots});

        return res.status(201).json({ result });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    registerDoctor
};