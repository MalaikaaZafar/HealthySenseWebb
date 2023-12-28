const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true, match: [/^\+[0-9]+[0-9]{10}$/]},
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    type: { type: String, required: true, enum: ['Patient', 'Doctor', 'Admin'] },
    isBanned: { type: Boolean, default: false },
    profilePicture: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;