const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    updateReason: { type: String },
    type: { type: String, enum: ['Online', 'Clinic'], required: true },
    problem: { type: String, required: true },
    status: { type: String, enum: ['Booked', 'Cancelled', 'Completed'],  required: true },
    paymentStatus: { type: String, enum: ['Paid', 'Unpaid'], required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;