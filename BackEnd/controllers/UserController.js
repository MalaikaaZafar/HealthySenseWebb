const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.SECRET;

const signup = async (req, res) => {
    const { name, email, password, dob, country, phoneNumber, gender, type} = req.body;

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
};

const login = async (req, res) => {
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
};

module.exports = {
    login,
    signup
};