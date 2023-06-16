const mongoose = require('mongoose');
const dotenv = require('dotenv');

require('dotenv').config();

const URI = 'mongodb+srv://kartikeym2:9881199073Km@cluster1.bws7ovj.mongodb.net/iNotebook?retryWrites=true&w=majority'// MongoDB URL from Atlas

// Function to connect to the database
 const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...'); // Log a success message when connected
  } catch (error) {
    console.log(error.message); // Log the error message if connection fails
    process.exit(1); // Exit the process with a non-zero code
  }
};
module.exports = connectDB;