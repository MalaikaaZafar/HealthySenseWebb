const mongoose = require('mongoose');

const notficationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    isRead: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true }, // match: [/^\+[0-9]+[0-9]{10}$/]
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    type: { type: String, required: true, enum: ['Patient', 'Doctor', 'Admin'] },
    isBanned: { type: Boolean, default: false },
    profilePicture: { type: String },
    notifications: [notficationSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;