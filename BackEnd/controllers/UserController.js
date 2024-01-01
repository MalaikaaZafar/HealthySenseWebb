const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const User = require("../models/User");
const Chat = require("../models/Message");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Apointments");
const Review = require("../models/Reviews");
const { default: mongoose } = require("mongoose");

const secret = process.env.SECRET;

const userController = {
  getUserType: async (req, res) => {
    console.log(req.user);
    const userType = req.user.type;
    return res.status(200).json(userType);
  },
  signup: async (req, res) => {
    const {
      name,
      email,
      password,
      dob,
      country,
      phoneNumber,
      gender,
      type,
      bloodGroup,
    } = req.body;

    try {
      const file = req.files.profilePicture;

      const existingUser = await User.findOne({ email });

      if (existingUser)
        return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(String(password), 12);

      const result = await User.create({
        name,
        email,
        password: hashedPassword,
        dob,
        country,
        phoneNumber,
        gender,
        type,
        profilePicture: null,
      });

      const token = jwt.sign({ email: result.email, id: result._id }, secret);

      const temp = {
        name: result.name,
        email: result.email,
        dob: result.dob,
        country: result.country,
        phoneNumber: result.phoneNumber,
        gender: result.gender,
        type: result.type,
      };

      const fileName = `${result._id}${path.extname(file.name)}`;

      await file.mv("./uploads/" + fileName);

      result.profilePicture = fileName;

      await result.save();

      if (result.type === "Patient") {
        await Patient.create({ user: result._id, bloodGroup: bloodGroup });
      }

      return res.status(201).json({ result: temp, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Fetch the user with the provided email
      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!existingUser)
        return res.status(404).json({ message: "User doesn't exist" });

      const isPasswordCorrect = await bcrypt.compare(
        String(password),
        existingUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        secret
      );
      return res.status(200).json({ result: existingUser, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  getMessages: async (req, res) => {
    try {
      const secondaryId = req.params.id;
      const userId = req.user._id;
      if (secondaryId) {
        let doctorChats = await Chat.findOne({
          $or: [
            {
              primary: userId,
              secondary: new mongoose.Types.ObjectId(secondaryId),
            },
            {
              primary: new mongoose.Types.ObjectId(secondaryId),
              secondary: userId,
            },
          ],
        }).populate("primary");
        console.log(doctorChats);
        if (!doctorChats) {
          doctorChats = await Chat.create({
            primary: new mongoose.Types.ObjectId(userId),
            secondary: new mongoose.Types.ObjectId(secondaryId),
            date: new Date(),
            messages: [],
          });
          await doctorChats.save();
        }
      }
      const chat = await Chat.find({
        $or: [{ primary: userId }, { secondary: userId }],
      })
        .populate("primary")
        .populate("secondary");
      console.log(chat);
      return res.status(200).json({ message: "Success", chat: chat });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

  sendMessage: async (req, res) => {
    try {
      console.log(req.body);
      const { message, secondary } = req.body;
      console.log(message);

      const doctorChats = await Chat.findOneAndUpdate(
        {
          $or: [
            { primary: message.senderId, secondary: secondary },
            { primary: secondary, secondary: message.senderId },
          ],
        },
        { $push: { messages: message } },
        { new: true }
      );
      if (!doctorChats)
        return res.status(404).json({ message: "Doctor not found" });

      return res
        .status(200)
        .json({ message: "Success", messages: doctorChats });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

  getDoctorDetails: async (req, res) => {
    try {
      const doctorId = req.params.id;
      const doctor = await Doctor.findOne({ user: doctorId })
        .populate("user")
        .exec();
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      const patientCount = await Appointment.distinct("patientId", {
        doctorId: doctor._id,
        status: "Completed",
      });

      const reviews = await Review.find({ doctorId: doctor._id });
      let staffRating = 0;
      let clinicRating = 0;
      let checkupRating = 0;

      console.log(doctor._id);

      for (let i = 0; i < reviews.length; i++) {
        staffRating += reviews[i].staffRating;
        clinicRating += reviews[i].environmentRating;
        checkupRating += reviews[i].checkupRating;
      }

      if (reviews.length > 0) {
        staffRating /= reviews.length;
        clinicRating /= reviews.length;
        checkupRating /= reviews.length;
      }

      staffRating = staffRating * 20;
      clinicRating = clinicRating * 20;
      checkupRating = checkupRating * 20;

      const minFee = doctor.session.reduce(
        (min, session) => (session.fee < min ? session.fee : min),
        doctor.session[0].fee
      );

      let temp = {
        name: doctor.user.name,
        specialization: doctor.specialization,
        rating: doctor.rating,
        experience: doctor.experience,
        patients: patientCount.length,
        profilePicture: doctor.user.profilePicture,
        certifications: doctor.certificates,
        reviews: reviews,
        staffRating: staffRating,
        clinicRating: clinicRating,
        checkupRating: checkupRating,
        description: doctor.description,
        fees: doctor.fees,
        location: doctor.location,
        services: doctor.services,
        availability: doctor.availability,
        fees: minFee,
      };

      return res.status(200).json(temp);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
};

module.exports = userController;
