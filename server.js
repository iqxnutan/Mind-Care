require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // bodyParser.json() is now built into Express

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mindcare')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// MongoDB Schema
const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  department: String,
  message: String,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Nodemailer transporter (using environment variables)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Store in .env file
    pass: process.env.EMAIL_PASS  // Store in .env file
  }
});

// Routes
app.post('/api/appointments', async (req, res) => {
  const { name, email, phone, date, department, message } = req.body;

  try {
    // Save to database
    const newAppointment = new Appointment({ name, email, phone, date, department, message });
    await newAppointment.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'MindCare Appointment Confirmation',
      text: `Hello ${name},\n\nYour appointment for ${department} on ${date} has been successfully booked.\n\nThank you,\nMindCare Team`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Appointment booked successfully and email sent!' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server on port 4000
const PORT = process.env.PORT || 3000; // Use 4000 as default
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

