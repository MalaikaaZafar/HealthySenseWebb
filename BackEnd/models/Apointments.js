const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    Doctorid: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    Patientid: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    UpdateReason: { type: String, required: true },
    problem: { type: String, required: true },
    Status: { type: String, enum: ['Approved', 'Cancelled', 'Completed'],  required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;