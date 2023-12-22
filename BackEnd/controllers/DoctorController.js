const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Appointment=require('../models/Apointments');


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

const getAllDoctors = async (req, res) => {
    const docList=await Doctor.find();
    return res.status(200).json({docList});
}


// view all consultations of a doctor, both pending and completed
const consultations=async(req,res)=>{
    const { UserId } = req.body;
    console.log('req.UserId',req.UserId)
    try{
        const doctor=await Doctor.findOne({id:UserId});
        console.log(doctor);
        if(!doctor)
            return res.status(404).json({message:"Doctor not found"});
       
        const consultationList=await Appointment.find({doctorId:UserId});
        return res.status(200).json({consultationList});
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Something went wrong"});
    }
}

// view details of a specific appointment
const getConsultationById=async(req,res)=>{
    const {UserId, date, time}=req.body;
    try{
        const consultation=await Appointment.findOne({doctorId:UserId, date:date, time:time});
        if(!consultation)
            return res.status(404).json({message:"Consultation not found"});
        return res.status(200).json({consultation});
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Something went wrong"});
    }
}

// update consultation
const updateConsultation=async(req,res)=>{
    const {id, date, time, updateReason, status}=req.body;
    const consultation=await Appointment.findById(id);
    if (!consultation)
        return res.status(404).json({message:"Consultation not found"});
    consultation.date=date;
    consultation.time=time;
    consultation.updateReason=updateReason;
    consultation.status=status;
    await consultation.save();
    return res.status(200).json({consultation});
}


// add Appointment Slots
const addAppointmentSlots=async(req,res)=>{
    const {doctorId, date, time}=req.body;
    const doctor=await Doctor.findById(doctorId);
    if(!doctor)
        return res.status(404).json({message:"Doctor not found"});
    const appointmentSlots=doctor.appointmentSlots;
    appointmentSlots.push({date, time});
    await doctor.save();
    return res.status(200).json({doctor});
}

module.exports = {
    registerDoctor,
    getAllDoctors, 
    consultations, 
    getConsultationById,
    updateConsultation,
    addAppointmentSlots
};