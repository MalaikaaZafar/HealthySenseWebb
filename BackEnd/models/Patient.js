const mongoose = require('mongoose');

const patientHistorySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
});

const patientSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    BloodGroup: { type: String, required: true },
    history: [patientHistorySchema],
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
