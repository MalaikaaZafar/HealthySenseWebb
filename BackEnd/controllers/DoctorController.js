const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Appointment = require('../models/Apointments');
const Payment = require('../models/Payment');
const Diagnosis = require('../models/Diagnosis');
const { populate } = require('../models/Patient');
const fs = require('fs');


const doctorController = {

    registerDoctor: async (req, res) => {
        const { specialization, description, location, experience, workingHours, fee, services, appointmentSlots } = req.body;

        const files = req.files.certificates;
        const fileNames = [];
        for (let i = 0; i < files.length; i++) {
            const fileName = Date.now() + files[i].name;
            fileNames.push(fileName);

            files[i].mv(`../uploads/${fileName}`, async (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ msg: "Error occured in uploading certificates" });
                }
            });
        }

        try {
            const existingUser = await User.findById(req.UserId);

            if (!existingUser || existingUser.type !== "Doctor" || existingUser._id !== req.UserId)
                return res.status(404).json({ message: "Wrong User" });

            const certificates = [];

            for (let i = 0; i < files.length; i++) {
                const certificate = {
                    name: files[i].name,
                    description: req.body.certificates[i].description,
                    issueDate: req.body.certificates[i].issueDate,
                    expiryDate: req.body.certificates[i].expiryDate,
                    file: fileNames[i]
                };
                certificates.push(certificate);
            }

            const result = await Doctor.create({ id: req.UserId, specialization, description, location, experience, workingHours, fee, certificates, services, appointmentSlots });

            return res.status(201).json({ result });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
        }
    },

    getAllDoctors: async (req, res) => {
        const docList = await Doctor.find();
        return res.status(200).json({ docList });
    },


    // view all consultations of a doctor, both pending and completed
    consultations: async (req, res) => {
        const UserId = "658546f9e3b8a4d7e100aa68";
        try {
            const apptList = await Appointment.find({ doctorId: UserId }).populate({ path: 'doctorId', populate: { path: 'user' } }).exec();
            return res.status(200).json(apptList);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },

    // view details of a specific appointment 
    getConsultationById: async (req, res) => {
        const { id } = req.params;
        try {
            const consultation = await Appointment.findById(id);
            if (!consultation)
                return res.status(404).json({ message: "Consultation not found" });
            const user = await User.findById(consultation.patientId);
            const fee = await Payment.findOne({ appointmentId: id }, { amount: 1, status: 1 });
            const doctor = await User.findOne({ _id: consultation.doctorId });
            const docDetails = await Doctor.findOne({ id: consultation.doctorId });
            const docOrPatient = { user: doctor, details: docDetails };
            return res.status(200).json({ user, docOrPatient, fee, consult: consultation });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },

    // update consultation
    updateConsultation: async (req, res) => {
        const { id, date, time, updateReason, status } = req.body;
        const consultation = await Appointment.findById(id);
        if (!consultation)
            return res.status(404).json({ message: "Consultation not found" });
        consultation.date = date;
        consultation.time = time;
        consultation.updateReason = updateReason;
        consultation.status = status;
        await consultation.save();
        return res.status(200).json({ consultation });
    },


    // add Appointment Slots
    addAppointmentSlots: async (req, res) => {
        const { doctorId, date, time } = req.body;
        const doctor = await Doctor.findById(doctorId);
        if (!doctor)
            return res.status(404).json({ message: "Doctor not found" });
        const appointmentSlots = doctor.appointmentSlots;
        appointmentSlots.push({ date, time });
        await doctor.save();
        return res.status(200).json({ doctor });
    },

    getSpecialties: async (req, res) => {
        const specialties = await Doctor.distinct("specialization");
        return res.status(200).json({ specialties });
    },

    rescheduleAppt: async (req, res) => {
        const { id, date, time, reason } = req.body;
        try {
            const appointment = await Appointment.findById(id);
            if (!appointment)
                return res.status(404).json({ message: "Appointment not found" });
            const doctor = await Doctor.findOne({ id: appointment.doctorId });
            if (doctor) {
                var slots = doctor.appointmentSlots.filter(slot => (slot.date !== appointment.date && slot.time !== appointment.time));
                slots.push({ date: appointment.date, time: appointment.time, availability: true });
                const newSlots = slots.filter(slot => (slot.date !== date && slot.time !== time));
                newSlots.push({ date, time, availability: false });
                doctor.appointmentSlots = newSlots;
                console.log(doctor.appointmentSlots);
            }
            await doctor.save();
            appointment.date = date;
            appointment.time = time;
            appointment.updateReason = reason;
            await appointment.save();
            return res.status(200).json({ message: 'Success', appointment: appointment, docOrPatient: doctor });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },

    cancelAppt: async (req, res) => {
        const { id, reason } = req.body;
        try {
            const appointment = await Appointment.findById(id);
            if (!appointment)
                return res.status(404).json({ message: "Appointment not found" });
            appointment.status = "Cancelled";
            appointment.updateReason = reason;
            const doc = await Doctor.findOne({ id: appointment.doctorId });
            const slot = doc.appointmentSlots.find(slot => slot.date === appointment.date && slot.time === appointment.time);
            slot.availability = true;
            await doc.save();
            await appointment.save();
            console.log(appointment);
            return res.status(200).json(appointment);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },
    addSlots: async (req, res) => {
        const { slots } = req.body;
        const UserId = "65854380aa6b07046cf14512";
        try {
            const doctor = await Doctor.findOne({ id: UserId });
            if (!doctor)
                return res.status(404).json({ message: "Doctor not found" });
            const newSlots = doctor.appointmentSlots.concat(slots);
            doctor.appointmentSlots = newSlots;
            await doctor.save();
            return res.status(200).json({ message: "Success" });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },

    searchDoctors: async (req, res) => {
        const { query, sort, sortOrder, specialty, minRating } = req.query;

        try {
            const users = await User.find({ name: { $regex: query, $options: 'i' } });
            const userIds = users.map(user => user._id);

            let filter = { user: { $in: userIds } };

            if (specialty) {
                filter.specialization = specialty;
            }

            // if (minRating) {
            //     filter.rating = { $gte: minRating };
            // }

            let doctors = await Doctor.find(filter).populate('user');

            if (doctors.length !== 0) {



                if (sort === 'A-Z') {
                    doctors = doctors.sort((a, b) => {
                        const nameA = a.user.name.toUpperCase();
                        const nameB = b.user.name.toUpperCase();

                        if (nameA < nameB) {
                            return sortOrder === 'asc' ? -1 : 1;
                        }
                        if (nameA > nameB) {
                            return sortOrder === 'asc' ? 1 : -1;
                        }

                        return 0;
                    });
                }
                else if (sort === 'Price') {
                    doctors = doctors.sort((a, b) => {
                        return sortOrder === 'asc' ? a.fee - b.fee : b.fee - a.fee;
                    });
                }
                // else if(sort==='Rating'){
                //     doctors = doctors.sort((a, b) => {
                //         return direction === 'asc' ? a.rating - b.rating : b.rating - a.rating;
                //     });
                // }
            }
            res.json(doctors);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAppintmentDetails: async (req, res) => {
        const { id } = req.params;
        console.log(id);
        try {
            const AppointmentDetail = await Appointment.findById(id).populate(
                { path: 'doctorId', populate: { path: 'user' } }
            )
            .populate(
                { path: 'patientId', populate: { path: 'user' } }
            ).exec();

            if (!AppointmentDetail){
                return res.status(402).json({ message: "Appointment not found" });
            }
            console.log(AppointmentDetail);

            AppointmentDetail.doctorId.appointmentSlots = undefined;
            AppointmentDetail.doctorId.services = undefined;

            AppointmentDetail.doctorId.user.profilePicture = undefined;
            AppointmentDetail.doctorId.user.password = null;

            AppointmentDetail.patientId.user.password = undefined;
            AppointmentDetail.patientId.user.profilePicture = null;

            AppointmentDetail.doctorId.certificates = undefined;

            return res.status(200).json({ AppointmentDetail });
        } catch (error) {
            console.log(error.message);
            return res.status(502).json({ message: "Something went wrong" });
        }

    },

    getAccountDetails: async (req, res) => {
        const UserId = "65854380aa6b07046cf14512";
        try {
            const doctor = await Doctor.findOne({ id: UserId }).populate({ path: 'user' }).exec();
            if (!doctor)
                return res.status(404).json({ message: "Doctor not found" });

            //Retrieve certificates
            const certificates = [];
            for (let i = 0; i < doctor.certificates.length; i++) {
                // Get File form Uploads folder
                const file = doctor.certificates[i].file;
                const path = `../uploads/${file}`;
                const fileToSend = fs.readFileSync(path);
                const fileToSendBase64 = fileToSend.toString('base64');
                certificates.push({ ...doctor.certificates[i].toObject(), file: fileToSendBase64 });
            }
            return res.status(200).json({ doctor });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },

    updateAccount: async (req, res) => {
        const { specialization, description, location, experience, workingHours, sessions, services, certificates, user } = req.body;
        const Files=req.files.certificates;
        const UserId = "65854380aa6b07046cf14512";
        try {
            const doctor = await Doctor.findOne({ id: UserId });
            if (!doctor)
                return res.status(404).json({ message: "Doctor not found" });
            doctor.specialization = specialization;
            doctor.description = description;
            doctor.location = location;
            doctor.experience = experience;
            doctor.workingHours = workingHours;
            doctor.fee = fee;
            doctor.services = services;
            await doctor.save();
            return res.status(200).json({ message: "Success" });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },

    createDiagnosis: async (req, res) => {
        const { id } = req.params;
        console.log(id);
        const { diagnosis, prescription, tests, notes, type, fee } = req.body;
        console.log(req.body);
        try {
            const appointment = await Appointment.findById(id);
            if (!appointment)
                return res.status(404).json({ message: "Appointment not found" });
            Diagnosis.create({ date: Date.now(), description: diagnosis, type, fee, notes, prescription, tests, appointmentId: id });
            appointment.status = "Completed";
            await appointment.save();
            console.log(appointment);   
            return res.status(200).json({ message: "Success" });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },
};

module.exports = doctorController;
