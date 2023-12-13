const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    Doctorid: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    Patientid: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;