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
const connectDB = require('./config/db');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/auth');
const schemeRoutes = require('./routes/scheme');
// const schemeDocumentsRoutes = require('./routes/schemeDocuments'); 

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/schemes', schemeRoutes);
// app.use('/api/documents', schemeDocumentsRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

