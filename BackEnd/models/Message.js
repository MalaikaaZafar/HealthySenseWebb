const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true },
})

const chatSchema = new mongoose.Schema({
    primary: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    secondary: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    date: { type: Date, required: true },
    messages:[messageSchema],
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;