const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');


const adminController = {
    getAllDoctors: async (req, res) => {
        try {
            const doctorList = await Doctor.find().populate('user').exec()
            return res.status(200).json(doctorList);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    searchDoctors: async (req, res) => {
        const { query, sortOrder, specialty, skip } = req.query;

        try {
            const q = User.find({ name: { $regex: query, $options: 'i' } }).where('type').equals('Doctor');
            const users = await q.exec();
            const userIds = users.map(user => user._id);
            let filter = { user: { $in: userIds } };
            if (specialty) {
                filter.specialization = specialty;
            }
            let doctors = await Doctor.find(filter).populate('user');

            if (doctors.length !== 0) {
                doctors = doctors.sort((a, b) => {
                    const [nameA, numberA = ''] = a.user.name.toUpperCase().split(' ');
                    const [nameB, numberB = ''] = b.user.name.toUpperCase().split(' ');

                    if (nameA < nameB) {
                        return sortOrder === 'asc' ? -1 : 1;
                    }
                    if (nameA > nameB) {
                        return sortOrder === 'asc' ? 1 : -1;
                    }
                    // If names are equal, compare the numbers
                    const numA = parseInt(numberA, 10);
                    const numB = parseInt(numberB, 10);
                    if (numA < numB) {
                        return sortOrder === 'asc' ? -1 : 1;
                    }
                    if (numA > numB) {
                        return sortOrder === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }

            doctors = doctors.slice(skip, skip + 6);
            return res.status(200).json(doctors);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    searchPatients: async (req, res) => {
        const { query, sortOrder, bloodGroup, skip } = req.query;

        try {
            const q = User.find({ name: { $regex: query, $options: 'i' } }).where('type').equals('Patient');
            const users = await q.exec();
            const userIds = users.map(user => user._id);
            let filter = { user: { $in: userIds } };
            if (bloodGroup) {
                filter.bloodGroup = bloodGroup;
            }
            let patients = await Patient.find(filter).populate('user');

            if (patients.length !== 0) {
                patients = patients.sort((a, b) => {
                    const [nameA, numberA = ''] = a.user.name.toUpperCase().split(' ');
                    const [nameB, numberB = ''] = b.user.name.toUpperCase().split(' ');

                    if (nameA < nameB) {
                        return sortOrder === 'asc' ? -1 : 1;
                    }
                    if (nameA > nameB) {
                        return sortOrder === 'asc' ? 1 : -1;
                    }
                    // If names are equal, compare the numbers
                    const numA = parseInt(numberA, 10);
                    const numB = parseInt(numberB, 10);
                    if (isNaN(numA) || isNaN(numB)) {
                        if (numA < numB) {
                            return sortOrder === 'asc' ? -1 : 1;
                        }
                        if (numA > numB) {
                            return sortOrder === 'asc' ? 1 : -1;
                        }
                    }
                    if (numA < numB) {
                        return sortOrder === 'asc' ? -1 : 1;
                    }
                    if (numA > numB) {
                        return sortOrder === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }

            patients = patients.slice(skip, skip + 6);
            return res.status(200).json(patients);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },
    getActivity: async (req, res) => {
        try {
            const totalUsers = await User.countDocuments();
            const totalDoctors = await Doctor.countDocuments();
            const totalPatients = await Patient.countDocuments();

            const activityData = {
                totalUsers,
                totalDoctors,
                totalPatients
            };

            return res.status(200).json(activityData);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },



    getAllPatients: async (req, res) => {
        try {
            const patientList = await Patient.find().populate('user').exec()
            return res.status(200).json(patientList);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    getDoctorsDetails: async (req, res) => {
        try {
            const details = await Doctor.find();
            return res.status(200).json(details);
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }

    },
}

module.exports = adminController;