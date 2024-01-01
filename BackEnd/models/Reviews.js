const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    comment: { type: String, required: true },
    experience: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    checkupRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    environmentRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    staffRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    recommendation: { type: Boolean, required: true },
    date: { type: Date, required: true },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;