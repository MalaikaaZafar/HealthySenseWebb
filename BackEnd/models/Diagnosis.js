const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
    date: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    prescription: [{ type: String, required: true }],
    tests: [{ type: String, required: true }], 
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;