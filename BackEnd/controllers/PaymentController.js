const mongoose = require("mongoose");
const stripe = require("stripe")("sk_test_51ORCE8COwHOebIPaJCcA5KIonEpNVIL5NoNTFFquyPetGMIPuKMfbn7M3HQWa0NSM4Tih512nFrI2qfZrbWSFKLp00wwmvDQHk");
const Appointment = require("../models/Apointments");
const Payment = require("../models/Payment");
const Diagnosis = require("../models/Diagnosis");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

const paymentController = {
    getClientSecret: async (req, res) => {
        const { id } = req.params;
        try {
            const diagnosis = await Diagnosis.findById(id).populate('appointmentId');
            var client_secret = null;
            const appointment = diagnosis.appointmentId;
            const doctor = await Doctor.findById(appointment.doctorId).populate('user');
            const payment = await Payment.findOne({ appointmentId: diagnosis.appointmentId._id });
            var paymentId = null;
            var status = false;
            if (payment) {
                paymentId = payment._id;
                client_secret = payment.clientSecret;
                if (payment.status == true) {
                    status = true;  
                }
            }
            else {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: (diagnosis.fee * 1000),
                    currency: "pkr",
                });
                const newpayment = new Payment({
                    appointmentId: appointment._id,
                    amount: diagnosis.fee,
                    date: appointment.date,
                    time: appointment.time,
                    status: false,
                    clientSecret: paymentIntent.client_secret,
                });
                await newpayment.save();
                client_secret = paymentIntent.client_secret;
                paymentId = newpayment._id;
            }
            const Data = {
                Name: doctor.user.name,
                Profile: doctor.user.profilePicture,
                Specialization: doctor.specialization,
                Location: doctor.location,
                Date: appointment.date,
                Time: appointment.time,
                Fee: diagnosis.fee,
                Type: diagnosis.type,
                PaymentId: paymentId,
                Status: status,
            }
            res.status(200).json({
                clientSecret: client_secret,
                Data: Data,
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
            const payment = await Payment.findById(id);
            const appointment = await Appointment.findById(payment.appointmentId);
            appointment.paymentStatus = 'Paid';
            await appointment.save();
            payment.status = true;
            await payment.save();
            res.status(200).json({
                message: "Payment Successful",
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