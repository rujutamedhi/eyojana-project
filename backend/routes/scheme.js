const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');
const upload = require('../middleware/fetchScheme'); // Assuming this is your multer setup

// Create a new scheme with documents
router.post('/', upload.array('documents'), async (req, res) => {
  try {
    const { schemename, user_id, email, status, category } = req.body;

    // Check if documents were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No documents uploaded.' });
    }

    // Prepare documents array with names
    const documents = req.files.map((file, index) => {
      const documentName = req.body[`document_name_${index}`] || file.originalname; // Use provided name or fall back to original name
      return {
        document_name: documentName,
        document: file.buffer,
      };
    });

    // Create a new scheme object
    const newScheme = new Scheme({
      schemename,
      user_id,
      email,
      status,
      category,
      documents,
    });

    // Save the new scheme to the database
    await newScheme.save();
    res.status(201).json(newScheme);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
