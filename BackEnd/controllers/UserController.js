const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Chat = require('../models/Message');
const { default: mongoose } = require('mongoose');


const secret = process.env.SECRET;

const userController = {
    signup: async (req, res) => {
        const { name, email, password, dob, country, phoneNumber, gender, type } = req.body;

        const file = req.files.profilePicture;

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) return res.status(400).json({ message: "User already exists" });

            const fileName = Date.now() + file.md5 + path.extname(file.name);

            const URL = './uploads/' + fileName;

            file.mv(URL)
                .then(
                    async () => {
                        const hashedPassword = await bcrypt.hash(password, 12);

                        const result = await User.create({ name, email, password: hashedPassword, dob, country, phoneNumber, gender, type, profilePicture: fileName });

                        const token = jwt.sign({ email: result.email, id: result._id }, secret);

                        const temp = {
                            name: result.name,
                            email: result.email,
                            dob: result.dob,
                            country: result.country,
                            phoneNumber: result.phoneNumber,
                            gender: result.gender,
                            type: result.type,
                            profilePicture: result.profilePicture,
                        };

                        return res.status(201).json({ result: temp, token });
                    })
                .catch((err) => console.log(err));

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    login: login = async (req, res) => {
        const { email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

            if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret);

            return res.status(200).json({ result: existingUser, token });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    getMessages: async (req, res) => {
        try {
          const secondaryId = req.params.id;
          console.log(secondaryId)
          const userId = "658aeab2a07cfdec21fc4946";
          let doctorChats = await Chat.findOne({ $or: [{ primary: userId, secondary: new mongoose.Types.ObjectId(secondaryId) }, { primary: new mongoose.Types.ObjectId(secondaryId), secondary: userId }] }).populate('primary');
          console.log(doctorChats)
          if (!doctorChats) {
            console.log("heelllooo")
            doctorChats = await Chat.create({ primary: new mongoose.Types.ObjectId(userId), secondary: new mongoose.Types.ObjectId(secondaryId), date: new Date(), messages: [] });
            await doctorChats.save();
          }
          const chat = await Chat.find({$or:[{primary:userId}, {secondary:userId}]})
          .populate('primary')
          .populate('secondary');
          console.log(chat)
          return res.status(200).json({ message: "Success", chat: chat });
        } catch (error) {
          console.log(error.message);
          return res.status(500).json({ message: "Something went wrong" });
        }
      },

    sendMessage: async (req, res) => {
        try {
            console.log(req.body)
            const { message, secondary } = req.body;
            console.log(message)
            
            const doctorChats = await Chat.findOneAndUpdate(
              { $or: [{ primary: message.senderId, secondary: secondary }, { primary: secondary, secondary: message.senderId }] },
              { $push: { messages: message } },
              { new: true }
            );
            if (!doctorChats)
              return res.status(404).json({ message: "Doctor not found" });
          
            return res.status(200).json({ message: "Success", messages: doctorChats });
          } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Something went wrong" });
          }
    },

    getUser: async (req, res) => {
        const arr = await User.find({ type: 'Patient' });
        return res.status(200).json(arr);
    }
};

module.exports = userController;
