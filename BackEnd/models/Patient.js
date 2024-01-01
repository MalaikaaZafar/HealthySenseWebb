const mongoose = require('mongoose');

const patientHistorySchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now() },
    description: { type: String, required: true },
    type: { type: String, required: true },
});


const complaintSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
});


const patientSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bloodGroup: { type: String, required: true },
    history: [patientHistorySchema],
    favoriteDoctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
    complaints: [complaintSchema],
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;