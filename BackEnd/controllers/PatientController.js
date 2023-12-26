const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Appointment = require("../models/Apointments");
const Payment = require("../models/Payment");

const patientController = {
  // view all consultations of a doctor, both pending and completed
  consultations: async (req, res) => {
    const UserId = "6585484c797f80875a8a769c";
    try {
      const apptList = await Appointment.find({ patientId: UserId })
        .populate({ path: "doctorId", populate: { path: "user" } })
        .populate({ path: "patientId", populate: { path: "user" } })
        .exec();
      return res.status(200).json(apptList);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

  getConsultationById: async (req, res) => {
    const { id } = req.params;
    try {
      const appt = await Appointment.findById(id)
        .populate({ path: "doctorId", populate: { path: "user" } })
        .populate({ path: "patientId", populate: { path: "user" } })
        .exec();
      return res.status(200).json(appt);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

  rescheduleAppt: async (req, res) => {
    const { id, date, type, time, reason } = req.body;
    try {
      const appointment = await Appointment.findByIdAndUpdate(id, {date: date, time: time, updateReason: reason}, {new: true})
      .populate("doctorId").exec();
      if (!appointment)
        return res.status(404).json({ message: "Appointment not found" });
      var slots = appointment.doctorId.appointmentSlots.filter(
        (slot) =>
          slot.date !== appointment.date && slot.time !== appointment.time
      );
      slots.push({
        date: appointment.date,
        time: appointment.time,
        type: appointment.type,
        availability: true,
      });
      const newSlots = slots.filter(
        (slot) => slot.date !== date && slot.time !== time
      );
      newSlots.push({ date: date, time: time,type: type, availability: false });
      console.log(newSlots);
      await Doctor.findByIdAndUpdate(appointment.doctorId._id, {appointmentSlots: newSlots},{new: true}).exec();
      const app=await Appointment.findById(id).populate("doctorId").populate('patientId').exec();
      console.log(appointment);
      return res
        .status(200)
        .json({ message: "Success", appointment: app });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

  cancelAppt: async (req, res) => {
    const { id, reason } = req.body;
    try {
      const appointment = await Appointment.findById(id)
        .populate("doctorId").exec();
      if (!appointment)
        return res.status(404).json({ message: "Appointment not found" });
      appointment.status = "Cancelled";
      appointment.updateReason = reason;
      const slot = appointment.doctorId.appointmentSlots.find(
        (slot) =>
        slot.date.getDate()===appointment.date.getDate() 
        && slot.date.getMonth()===appointment.date.getMonth()
        && slot.date.getFullYear()===appointment.date.getFullYear()
      );
      slot.availability =true;
      await appointment.save();
      console.log(appointment);
      return res.status(200).json({message: "Success", appointment: appointment});
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
  getDoctors: async (req, res) => {
    try{
      const doctors = await Doctor.find().populate("user").exec();
      return res.status(200).json({message: "Success", doctors});
    }
    catch(err){
      console.log(err.message);
      return res.status(500).json({message: "Something went wrong"});
    }
  },
  getDoctorById:async (req, res) => {
    const {id} = req.params;
    try{
      const doctor = await Doctor.findById(id).populate("user").exec();
      return res.status(200).json({message: "Success", doctor});
    }
    catch(err){
      console.log(err.message);
      return res.status(500).json({message: "Something went wrong"});
    }
  },
  bookAppointment: async (req, res) => {
    const { patientId, doctorId, date, time,type, problem } = req.body;
    try {
      const newDate=new Date(date);
      const appointment = new Appointment({
        patientId: patientId,
        doctorId: doctorId,
        date: newDate,
        time: time,
        type: type,
        problem: problem,
        status:'Booked',
        paymentStatus:'Unpaid',
      });
 
      await appointment.save();
      const doctor=await Doctor.findById(doctorId);
      doctor.appointmentSlots.forEach((slot)=>{
        console.log(date,slot.time,time);
        if(slot.date.getDate()===newDate.getDate() 
          && slot.date.getMonth()===newDate.getMonth()
          && slot.date.getFullYear()===newDate.getFullYear()
          && slot.time===time){
          slot.availability=false;
        }
      })
      await doctor.save();
      return res.status(200).json({ message: "Success", id: appointment._id });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
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
  },

};

module.exports = patientController;