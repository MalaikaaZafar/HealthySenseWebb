// insertManyChatMessages.js

const mongoose = require('mongoose');
const Chat = require('./models/Message');

// Replace with your MongoDB connection string
const mongoURI = `mongodb+srv://HealthySense:moix@healthysensecluster.c32wfpr.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a function to generate a random message with a random date within the last 30 days
const generateRandomMessage = (senderId) => {
  const currentDate = new Date();
  const randomDate = new Date(currentDate - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000); // Random date within the last 30 days

  return {
    senderId,
    text: `Random message: ${Math.random().toString(36).substring(2)}`,
    date: randomDate,
  };
};

// Create an array to store message objects
const messages = [];

// Generate and push 20 random messages
for (let i = 0; i < 20; i++) {
  messages.push(generateRandomMessage(i % 2 === 0 ? '658aeab2a07cfdec21fc4968' : '6585484c797f80875a8a769c'));
}

const chatData = {
    primary: '658aeab2a07cfdec21fc4968', // Replace with the actual primary user ID
    secondary: '6585484c797f80875a8a769c', // Replace with the actual secondary user ID
    date: new Date(),
    messages: messages,
  };

// Insert many messages into the Chat model
Chat.create(chatData)
  .then((insertedChat) => {
    console.log('Chat with messages created successfully:', insertedChat);
  })
  .catch((error) => {
    console.error('Error inserting messages or creating chat:', error);
  })
  .finally(() => {
    // Close the database connection
    mongoose.connection.close();
  });
