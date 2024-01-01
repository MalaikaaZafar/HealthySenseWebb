const mongoose = require('mongoose');

const appointmentSlotsSchema=new mongoose.Schema({
    date:{type:Date,required:true},
    time:{type:String,required:true},
    type:{type:String,enum:['Online','Clinic'],required:true},
    availability:{type:Boolean, default:true}
});

const certificateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    approvedStatus: { type: Boolean, default: false },
    description: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date},
    file: { type: String, required: true },
});

const doctorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    specialization: { type: String },
    description: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: Number, required: true },
    workingHours: { type: String},
    session: [{
       type: {
            type: String,
            enum: ['Online', 'Clinic'],
            required: true
        },
        fee: { 
            type: Number, 
            required: true }
    }],
    availability: { type: Boolean, default: true },
    certificates: [certificateSchema],
    services: [{ type: String}],
    appointmentSlots:[appointmentSlotsSchema],
    approvedStatus: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;