const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Appointment = require('../models/Apointments');
const Payment = require('../models/Payment');
const { populate } = require('../models/Patient');


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
        const UserId = "658aeab2a07cfdec21fc4931";
        try {
            const apptList = await Appointment.find({ doctorId: UserId })
            .populate({ path: 'doctorId', populate: { path: 'user' } })
            .populate({path: 'patientId', populate: {path:'user'}}).exec();
            return res.status(200).json({message: "Success", appList: apptList});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },

    // view details of a specific appointment 
    getConsultationById: async (req, res) => {
        const { id } = req.params;
        try {
            const consultation = await Appointment.findById(id)
            .populate({ path: 'doctorId', populate: { path: 'user' } })
            .populate({path: 'patientId', populate: {path:'user'}}).exec();
            if (!consultation)
                return res.status(404).json({ message: "Consultation not found" });
            return res.status(200).json({message:"Success", consultation: consultation});
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
        const { id, date, time,type, reason, neww } = req.body;
        try {
            const appointment = await Appointment.findById(id)
            .populate({ path: 'doctorId', populate: { path: 'user' } }).
            populate({path: 'patientId', populate: {path:'user'}}).exec();
            console.log(appointment);
            if (!appointment)
                return res.status(404).json({ message: "Appointment not found" });
            const doctor = appointment.doctorId;
            if (doctor) {
                var slots = doctor.appointmentSlots.filter(slot => (slot.date !== appointment.date && slot.time !== appointment.time));
                slots.push({ date: appointment.date, time: appointment.time,type:appointment.type, availability: true });
                if (neww === true && !slots.find(slot => (slot.date === date && slot.time === time)))
                {
                    slots.push({ date, time,type, availability: false });
                }
                else 
                {
                    const newSlots = slots.filter(slot => (slot.date !== date && slot.time !== time));
                    newSlots.push({ date, time,type, availability: false });
                    doctor.appointmentSlots = newSlots;
                }
            }
            await doctor.save();
            appointment.date = date;
            appointment.time = time;
            appointment.updateReason = reason;
            await appointment.save();
            return res.status(200).json({ message: 'Success', appointment: appointment});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },

    cancelAppt: async (req, res) => {
        const { id, reason } = req.body;
        try {
           const appointment=await Appointment.findByIdAndUpdate(id, { status: "Cancelled", updateReason: reason }, { new: true })
              .populate({ path: 'doctorId', populate: { path: 'user' } })
              .populate({path: 'patientId', populate: {path:'user'}}).exec();
              console.log(appointment);
            const doc=appointment.doctorId;
            var slots = doc.appointmentSlots.filter(slot => (slot.date !== appointment.date && slot.time !== appointment.time));
            slots.push({ date: appointment.date, time: appointment.time,type:appointment.type, availability: true });
            await doc.save();
            await appointment.save();
            return res.status(200).json({ message: 'Success', appointment: appointment});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },
    addSlots: async (req, res) => {
        const { slots } = req.body;
        const UserId = "658aeab2a07cfdec21fc4931";
        try {
            const doctor = await Doctor.findOne({ _id: UserId });
            if (!doctor)
                return res.status(404).json({ message: "Doctor not found" });
            const newSlots = doctor.appointmentSlots.concat(slots);
            doctor.appointmentSlots = newSlots;
            await doctor.save();
            return res.status(200).json({ message: "Success", slots: doctor.appointmentSlots });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },

    getSlots: async (req, res) => {
        const userId = "658aeab2a07cfdec21fc4931";
        try {
            const doctor = await Doctor.findOne({ _id: userId });
            if (!doctor)
                return res.status(404).json({ message: "Doctor not found" });
            return res.status(200).json({ slots: doctor.appointmentSlots });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },

    searchDoctors: async (req, res) => {
        const { query, sort, sortOrder, specialty, minRating, skip } = req.query;

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

            let doctors = await Doctor.find(filter).populate('user').skip(parseInt(skip)).limit(6);

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
    }


};

module.exports = doctorController;
