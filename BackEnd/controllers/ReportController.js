const Appointment = require('../models/Apointments');
const Diagnosis = require('../models/Diagnosis');

const reportController = {
    getReport: async (req, res) => {
        const { id } = req.params;
        try {
            const diagnosis = await Diagnosis.findById(id);
            if (!diagnosis) {
                return res.status(404).json({ message: 'Diagnosis not found' });
            }
            const appointment = await Appointment.findById(diagnosis.appointmentId)
                .populate({ path: 'doctorId', populate: { path: 'user' } })
                .populate({ path: 'patientId', populate: { path: 'user' } })
                .exec();
            if (!appointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
            console.log(appointment);
            const data = {
                DoctorName: appointment.doctorId.user.name,
                DoctorSpeciality: appointment.doctorId.specialization,
                DoctorLocation: appointment.doctorId.location,
                DoctorProfilePicture: appointment.doctorId.user.profilePicture,
                PatientProfilePicture: appointment.patientId.user.profilePicture,
                PatientEmail: appointment.patientId.user.email,
                PatientPhoneNumber: appointment.patientId.user.phoneNumber,
                PatientName: appointment.patientId.user.name,
                Date: appointment.date,
                Time: appointment.time,
                Problem: appointment.problem,
                Diagnosis: diagnosis.description,
                Prescription: diagnosis.prescription,
                Tests: diagnosis.tests,
                Notes: diagnosis.notes,
            }
            return res.status(200).json({ message: 'Success', data });

        } catch (error) {
            console.log(error);
            return res.status(502).json({ message: 'Something went wrong' });
        }
    },
    getSpecificReport: async (req, res) => {
        const { id } = req.params;
        try {
            const diagnosis = await Diagnosis.findOne({ appointmentId: id });
            if (!diagnosis) {
                return res.status(200).json({ message: 'Diagnosis not found' });
            }
            const appointment = await Appointment.findById(diagnosis.appointmentId)
                .populate({ path: 'doctorId', populate: { path: 'user' } })
                .populate({ path: 'patientId', populate: { path: 'user' } })
                .exec();
            if (!appointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }
            console.log(appointment);
            const data = {
                DoctorName: appointment.doctorId.user.name,
                DoctorSpeciality: appointment.doctorId.specialization,
                DoctorLocation: appointment.doctorId.location,
                DoctorProfilePicture: appointment.doctorId.user.profilePicture,
                PatientProfilePicture: appointment.patientId.user.profilePicture,
                PatientEmail: appointment.patientId.user.email,
                PatientPhoneNumber: appointment.patientId.user.phoneNumber,
                PatientName: appointment.patientId.user.name,
                Date: appointment.date,
                Time: appointment.time,
                Problem: appointment.problem,
                Diagnosis: diagnosis.description,
                Prescription: diagnosis.prescription,
                Tests: diagnosis.tests,
                Notes: diagnosis.notes,
            }
            return res.status(200).json({ message: 'Success', data });

        } catch (error) {
            console.log(error);
            return res.status(502).json({ message: 'Something went wrong' });
        }
    },
}

module.exports = reportController;