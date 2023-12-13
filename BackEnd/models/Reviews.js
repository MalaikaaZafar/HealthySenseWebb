const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    Doctorid: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    Patientid: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    Comment: { type: String, required: true },
    experience: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for experience.',
        },
    },
    CheckupRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for experience.',
        },
    },
    EnviormentRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for experience.',
        },
    },
    StaffRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer value for experience.',
        },
    },
    Recommendation: { type: Boolean, required: true },
    date: { type: Date, required: true },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;