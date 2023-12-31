const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")('sk_test_51ORCE8COwHOebIPaJCcA5KIonEpNVIL5NoNTFFquyPetGMIPuKMfbn7M3HQWa0NSM4Tih512nFrI2qfZrbWSFKLp00wwmvDQHk');
const Appointment = require("../models/Apointments");
const Payment = require("../models/Payment");

const paymentController = {
    getClientSecret: async (req, res) => {
        const { id } = req.params;
        try {
            const appointment = await Appointment.findById(id).populate({ path: 'doctorId', populate: { path: 'user' } }).exec();
            if (!appointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
            var client_secret = null;
            var fee = null;
            const payment = await Payment.findOne({ appointmentId: appointment._id });
            var paymentId = null;
            var status = false;
            if (payment) {
                paymentId = payment._id;
                client_secret = payment.clientSecret;
                fee = payment.amount;
                if (payment.status == true) {
                    status = true;  
                }
            }
            else {
                const type = appointment.type;
                const index = appointment.doctorId.session.findIndex((session) => session.type == type);
                fee = appointment.doctorId.session[index].fee;
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: (fee * 1000),
                    currency: "pkr",
                });
                const newpayment = new Payment({
                    appointmentId: appointment._id,
                    amount: fee,
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
                Name: appointment.doctorId.user.name,
                Profile: appointment.doctorId.user.profilePicture,
                Specialization: appointment.doctorId.specialization,
                Location: appointment.doctorId.location,
                Date: appointment.date,
                Time: appointment.time,
                Fee: fee,
                Type: appointment.type,
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