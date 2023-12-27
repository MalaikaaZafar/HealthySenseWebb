const stripe = require("stripe")("sk_test_51ORCE8COwHOebIPaJCcA5KIonEpNVIL5NoNTFFquyPetGMIPuKMfbn7M3HQWa0NSM4Tih512nFrI2qfZrbWSFKLp00wwmvDQHk");
const Diagnosis = require("../models/Diagnosis");
const Appointment = require("../models/Apointments");
const Payment = require("../models/Payment");

const paymentController = {
    getClientSecret: async (req, res) => {
        const { id } = req.params;
        console.log(id);
        try {
            const diagnosis = await Diagnosis.findById(id);
            const paymentIntent = await stripe.paymentIntents.create({
                amount: (diagnosis.fee * 10000),
                currency: "pkr",
            });
            console.log(paymentIntent.client_secret);
            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Something went wrong",
            });
        }
    },

    createPayment: async (req, res) => {
        const { id } = req.params;
        try {
            const diagnosis = await Diagnosis.findById(id).populate('appointmentId');
            const appointment = diagnosis.appointmentId;
            const payment = new Payment({
                appointmentId: appointment._id,
                amount: diagnosis.fee,
                date: appointment.date,
                time: appointment.time,
                status: true,
            });
            await payment.save();
            await Appointment.findByIdAndUpdate(appointment._id, { paymentStatus: true });
            res.status(200).json({
                message: "Payment Registered",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Something went wrong",
            });
        }
    },
}

module.exports = paymentController;