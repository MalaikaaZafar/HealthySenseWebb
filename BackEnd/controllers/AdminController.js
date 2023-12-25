const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');


const adminController = {
    getAllDoctors: async (req, res) => {
        const docList = await User.find({ type: 'Doctor' });
        if (!docList)
            return res.status(404).json({ message: "No doctors found" });
        const details = await Doctor.find();
        const list = docList.map((doc) => {
            ;
            const detail = details.find((d) => {
                if (d.id.toString() === doc._id.toString()) {
                    return d;
                }
            });
            return { user: doc, details: detail };
        })
        return res.status(200).json(list);
    },



    getAllPatients: async (req, res) => {
        try {
            const patientList = await User.find({ type: 'Patient' });
            if (!patientList)
                return res.status(404).json({ message: "No patients found" });
            const details = await Patient.find();
            const list = patientList.map((doc) => {
                const detail = details.find((d) => {
                    if (d.id.toString() === doc._id.toString()) {
                        return d;
                    }
                });
                return { user: doc, details: detail };
            })
            return res.status(200).json(list);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    getDoctorsDetails: async (req, res) => {
        try {
            const details = await Doctor.find();
            return res.status(200).json(details);
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }

    },
}

module.exports = adminController;