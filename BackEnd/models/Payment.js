const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    AppointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    Status: { type: Boolean, required: true },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;