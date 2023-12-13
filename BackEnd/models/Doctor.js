const mongoose = require('mongoose');

const appointmentSlotsSchema=new mongoose.Schema({
    date:{type:Date,required:true},
    time:{type:Date,required:true},
    availability:{type:Boolean,required:true}
});

const certificateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    approvedStatus: { type: Boolean, required: true },
    description: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
});

const doctorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: { type: String },
    description: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: Number, required: true },
    workingHours: { type: String, required: true },
    fee: { type: Number, required: true },
    availability: { type: String },
    certificates: [certificateSchema],
    services: [{ type: String, required: true }],
    appointmentSlots:[appointmentSlotsSchema],
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
