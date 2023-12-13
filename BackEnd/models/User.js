const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true, match: /^[0-9]{11}$/ },
    gender: { type: String, required: true, enum: ['Male', 'Female'] },
    type: { type: String, required: true, enum: ['Patient', 'Doctor', 'Admin'] },
    isBanned: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;