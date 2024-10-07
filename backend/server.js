// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const connectDB = require('./config/db');

// const app = express();


// connectDB();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// const adminRoutes = require('./routes/admin');
// const userRoutes = require('./routes/auth');
// // const schemeRoutes = require('./routes/schemeRoutes');
// // const schemeDocumentsRoutes = require('./routes/schemeDocumentsRoutes');

// // Use routes
// app.use('/api/admin', adminRoutes);
// app.use('/api/auth', userRoutes);
// app.use('/api/scheme', schemeRoutes);
// // app.use('/api/documents', schemeDocumentsRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const connectDB = require('./config/db');
const nodemailer = require('nodemailer');
require('dotenv').config(); 
const upload = multer({ /* storage options */ });
const app = express();


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


// const transporter = nodemailer.createTransport({
//     service: 'gmail', 
//     auth: {
//       user: EMAIL_NAME, 
//       pass: EMAIL_PASS, 
//     },
//   });

  app.post('/api/schemes', upload.array('documents'), async (req, res) => {
    const { schemename, user_id, email, status, category } = req.body;
console.log('email testing 1');
    // Email sending setup
    
    console.log('email testing 2');
    // const mailOptions = {
    //     from: EMAIL_NAME,
    //     to: email, // Ensure this is the correct email received
    //     subject: 'Scheme Application Received',
    //     text: `Your application for the scheme has been received.`,
    // };
    console.log('email testing 3');
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Application submitted and email sent!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

