const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Appointment=require('../models/Apointments');
const Payment = require('../models/Payment');


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

// view all consultations of a doctor, both pending and completed
const consultations=async(req,res)=>{
    const UserId="65854380aa6b07046cf14512";
    try{
        const doctor=await Doctor.findOne({id:UserId});
        console.log(doctor);
        if(!doctor)
            return res.status(404).json({message:"Doctor not found"});
       
        const consultationList=await Appointment.find({doctorId:UserId});
        const consultations= await Promise.all(
            consultationList.map(async (consultation)=>{
            const patient = await User.findById(consultation.patientId, {_id:0, name: 1});
            return {name: patient.name, consult: consultation};
        }));
        return res.status(200).json(consultations);
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Something went wrong"});
    }
}

// view details of a specific appointment
const getConsultationById=async(req,res)=>{
    const {id}= req.params;
    try{
        const consultation=await Appointment.findById(id);
        if(!consultation)
            return res.status(404).json({message:"Consultation not found"});
        const user=await User.findById(consultation.patientId);
        const fee= await Payment.findOne({appointmentId: id}, {amount: 1, status:1});
        const doctor= await User.findOne({_id:consultation.doctorId});
        const docDetails= await Doctor.findOne({id:consultation.doctorId});
        const docOrPatient={user: doctor, details: docDetails};
        return res.status(200).json({user, docOrPatient, fee, consult:consultation});
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Something went wrong"});
    }
}

// update consultation
const rescheduleAppt=async(req,res)=>{
    const {id, date, time, reason}=req.body;
    try{
        const appointment=await Appointment.findById(id);
        if(!appointment)
            return res.status(404).json({message:"Appointment not found"});
        const slot=await Doctor.findOne({id: appointment.doctorId,appointmentSlots:{$elemMatch:{date:appointment.date, time:appointment.time}}});
        if (!slot)
        {
            const doctor=await Doctor.findOne({id:appointment.doctorId});
            doctor.appointmentSlots.push({date:date, time:time, availability: false});
            await doctor.save();
        }
        appointment.date=date;
        appointment.time=time;
        appointment.updateReason=reason;
        await appointment.save();
        return res.status(200).json(appointment);
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Something went wrong"});
    }
}

const cancelAppt=async (req,res)=>{
    const {id, reason} = req.body;
    try{
        const appointment=await Appointment.findById(id);
        if(!appointment)
            return res.status(404).json({message:"Appointment not found"});
        appointment.status="Cancelled";
        appointment.updateReason=reason;
        const doc=await Doctor.findOne({id: appointment.doctorId,appointmentSlots:{$elemMatch:{date:appointment.date, time:appointment.time}}});
        const slot = doc.appointmentSlots.find(slot => slot.date === appointment.date && slot.time === appointment.time);
        if (slot)
            slot.availability=true;
        await doc.save();
        await appointment.save();
        console.log(appointment);
        return res.status(200).json(appointment);
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message:"Something went wrong"});
    }
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
    consultations, 
    getConsultationById,
    rescheduleAppt,
    cancelAppt,
    addAppointmentSlots
};


