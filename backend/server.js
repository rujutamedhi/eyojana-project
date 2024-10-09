const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const connectDB = require('./config/db');
const nodemailer = require('nodemailer');
require('dotenv').config(); 
const upload = multer({ /* storage options */ });
const app = express();
const sendEmail = require("./utils/sendEmail");

// Connect to the database
connectDB();
console.log("test1")
// Middleware
app.use(cors());
console.log("test2")
app.use(bodyParser.json());
console.log("test3")
// Routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/auth');
const schemeRoutes = require('./routes/scheme');
// const schemeDocumentsRoutes = require('./routes/schemeDocuments'); 
console.log("test4")
// Use routes
app.use('/api/admin', adminRoutes);
console.log("test6")
app.use('/api/auth', userRoutes);
console.log("test7")
app.use('/api/schemes', schemeRoutes);
 
app.use('/api/auth/email' , userRoutes);
app.use('/api/schemes/:email' , schemeRoutes);

// const transporter = nodemailer.createTransport({
//     service: 'gmail', 
//     auth: {
//       user: EMAIL_NAME, 
//       pass: EMAIL_PASS, 
//     },
//   });

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

  app.post('/send-email', async (req, res) => {
    const { email, message } = req.body;
  
    try {
      const send_to = email;
      const sent_from = process.env.EMAIL_NAME;
      const reply_to = email;
      const subject = "Application Status Update";
  
      // Create the email content dynamically
      const emailMessage = `
        <h3>E-yojana</h3>
        <p>${message}</p>
      `;
  
      // Call sendEmail function
      const emailResult = await sendEmail(subject, emailMessage, send_to, sent_from, reply_to);
  
      if (emailResult.success) {
        res.status(200).json({ message: "Email sent successfully" });
      } else {
        res.status(500).json({ error: "Failed to send email", details: emailResult.error });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error while sending email" });
    }
  });

  // Assuming you have Mongoose or MongoDB setup
app.get('/api/schemes/:id', async (req, res) => {
  try {
      const scheme = await Scheme.findById(req.params.id);
      if (!scheme) {
          return res.status(404).send('Scheme not found');
      }
      res.json(scheme); // Send the scheme data back as JSON
  } catch (error) {
      console.error('Error fetching scheme:', error);
      res.status(500).send('Internal server error');
  }
});

  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

