const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');


const adminController = {
    getAllDoctors: async (req, res) => {
    try{
        const doctorList=await Doctor.find().populate('user').exec()
        return res.status(200).json(doctorList);
    }catch(err){
        return res.status(500).json({message:err.message});
    }},



    getAllPatients: async (req, res) => {
        try {
            const patientList = await Patient.find().populate('user').exec()
            return res.status(200).json(patientList);
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