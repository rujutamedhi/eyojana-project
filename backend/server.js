const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const connectDB = require('./config/db');
const nodemailer = require('nodemailer');
require('dotenv').config();
const upload = multer({ /* storage options */ });
const sendEmail = require("./utils/sendEmail");
const User = require('./models/User'); 
const Scheme = require('./models/Scheme');

// Initialize express app
const app = express();

// Connect to the database
connectDB();
console.log("Database connected");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/auth');
const schemeRoutes = require('./routes/scheme');
const statisticsRoutes = require('./routes/statistics'); // NEW for statistics

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/statistics', statisticsRoutes); // NEW for statistics

// Email route for sending an application status update
app.post("/api/sendemail", async (req, res) => {
    const { email } = req.body;

    try {
        const send_to = email;
        const sent_from = process.env.EMAIL_NAME;
        const reply_to = email;
        const subject = "Application received";
        const message = `
            <h3>E-yojana</h3>
            <p>You have successfully applied for the scheme.</p>
            <p>Regards...</p>
        `;

        await sendEmail(subject, message, send_to, sent_from, reply_to);
        res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// Email route for status update
app.post('/send-email', async (req, res) => {
    const { email, message } = req.body;

    try {
        const send_to = email;
        const sent_from = process.env.EMAIL_NAME;
        const reply_to = email;
        const subject = "Application Status Update";

        const emailMessage = `
            <h3>E-yojana</h3>
            <p>${message}</p>
        `;

        await sendEmail(subject, emailMessage, send_to, sent_from, reply_to);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error while sending email" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
