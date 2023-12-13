const mongoose = require('mongoose');

const appointmentSlotsSchema=new mongoose.Schema({
    date:{type:Date,required:true},
    time:{type:Date,required:true},
    availability:{type:Boolean, default:true}
});

const certificateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    approvedStatus: { type: Boolean, default: false },
    description: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    file: { type: String, required: true },
});

const doctorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: { type: String },
    description: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: Number, required: true },
    workingHours: { type: String, required: true },
    fee: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    certificates: [certificateSchema],
    services: [{ type: String}],
    appointmentSlots:[appointmentSlotsSchema],
    approvedStatus: { type: Boolean, default: false },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
