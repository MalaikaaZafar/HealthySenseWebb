const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;