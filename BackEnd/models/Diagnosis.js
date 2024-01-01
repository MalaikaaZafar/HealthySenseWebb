const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Dosage: { type: String, required: true },
});

const diagnosisSchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now() },
    description: { type: String, required: true },
    type: { type: String, required: true },
    fee: { type: Number, required: true },
    notes: { type: String, required: true },
    prescription: [prescriptionSchema],
    tests: [{ type: String, required: true }], 
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;