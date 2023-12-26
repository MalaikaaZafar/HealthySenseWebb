const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const patientController = {
    getFavorites: async (req, res) => {
        const patient = await Patient.findOne({ id: req.userId });
        if (!patient)
            return res.status(404).json({ message: "Patient not found" });
        const doctors = await Doctor.find({ _id: { $in: patient.favoriteDoctors } });
        return res.status(200).json(doctors);
    },
    addFavorite: async (req, res) => {
        const { doctorId } = req.body;
        if (!doctorId)
            return res.status(400).json({ message: "Doctor ID not provided" });
        const patient = await Patient.findOne({ id: req.userId });
        if (!patient)
            return res.status(404).json({ message: "Patient not found" });
        const doctor = await Doctor.findOne({ _id: doctorId });

        if (!doctor)
            return res.status(404).json({ message: "Doctor not found" });

        if (patient.favoriteDoctors.includes(doctor._id))
            return res.status(400).json({ message: "Doctor already in favorites" });

        patient.favoriteDoctors.push(doctor._id);
        await patient.save();
        return res.status(200).json({ message: "Doctor added to favorites" });
    },
    removeFavorite: async (req, res) => {
        const { doctorId } = req.body;
        if (!doctorId)
            return res.status(400).json({ message: "Doctor ID not provided" });
        const patient = await Patient.findOne({ id: req.userId });
        if (!patient)
            return res.status(404).json({ message: "Patient not found" });

        if (!patient.favoriteDoctors.includes(doctorId))
            return res.status(400).json({ message: "Doctor not in favorites" });

        const index = patient.favoriteDoctors.indexOf(doctorId);
        patient.favoriteDoctors.splice(index, 1);
        await patient.save();
        return res.status(200).json({ message: "Doctor removed from favorites" });
    }

};

module.exports = patientController;