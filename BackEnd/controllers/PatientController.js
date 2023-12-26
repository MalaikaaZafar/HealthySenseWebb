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
    const { id, date, time, reason } = req.body;
    try {
      const appointment = await Appointment.findById(id)
        .populate("doctorId")
        .exec();
      if (!appointment)
        return res.status(404).json({ message: "Appointment not found" });
      var slots = appointment.doctorId.appointmentSlots.filter(
        (slot) =>
          slot.date !== appointment.date && slot.time !== appointment.time
      );
      slots.push({
        date: appointment.date,
        time: appointment.time,
        availability: true,
      });
      const newSlots = slots.filter(
        (slot) => slot.date !== date && slot.time !== time
      );
      newSlots.push({ date, time, availability: false });
      appointment.doctorId.appointmentSlots = newSlots;
      appointment.date = date;
      appointment.time = time;
      appointment.updateReason = reason;
      await appointment.save();
      return res
        .status(200)
        .json({ message: "Success", appointment: appointment });
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
          slot.date === appointment.date && slot.time === appointment.time
      );
      slot.availability = true;
      await appointment.save();
      return res.status(200).json(appointment);
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
    const { patientId, doctorId, date, time, problem } = req.body;
    try {
      const appointment = new Appointment({
        patientId,
        doctorId,
        date,
        time,
        problem,
      });
      await appointment.save();
      return res.status(200).json({ message: "Success", id: appointment._id });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
};

module.exports = patientController;
