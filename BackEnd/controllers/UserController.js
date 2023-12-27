const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Chat = require('../models/Message');

const secret = process.env.SECRET;

const userController = {
    signup: async (req, res) => {
        const { name, email, password, dob, country, phoneNumber, gender, type } = req.body;

        // upload image to images folder
        const file = req.files.profilePicture;
        const fileName = Date.now() + file.name;

        file.mv(`../uploads/${fileName}`, async (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ msg: "Error occured" });
            }
        });

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) return res.status(400).json({ message: "User already exists" });

            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await User.create({ name, email, password: hashedPassword, dob, country, phoneNumber, gender, type, profilePicture: fileName });

            const token = jwt.sign({ email: result.email, id: result._id }, secret);

            return res.status(201).json({ result, token });
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
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

    getMessages: async (req, res) =>{
        try{
            const userId = "658aeab2a07cfdec21fc4968";
            const doctorChats = await Chat.find({ primary: userId })
            .populate({ path: 'primary', populate: { path: 'user' } })
            .populate({ path: 'secondary', populate: { path: 'user' } });
            if (!doctorChats)
                return res.status(404).json({ message: "Doctor not found" });
            return res.status(200).json({ message: "Success", messages: doctorChats });
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },

    sendMessage: async (req, res) => {
        try{
            const {message, secondary}=req.body;
            const userId = "658aeab2a07cfdec21fc4968";
            const doctorChats = await Chat.findOneAndUpdate({primary: userId, secondary: secondary}, {$push: {messages: message}});
            if (!doctorChats)
                return res.status(404).json({ message: "Doctor not found" });
            return res.status(200).json({ message: "Success", messages: doctorChats });
        }
        catch(err)
        {
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
