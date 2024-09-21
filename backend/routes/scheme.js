const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');
const upload = require('../middleware/fetchScheme');

// Create a new scheme with documents
router.post('/', upload.array('documents'), async (req, res) => {
  try {
    const { schemename, user_id, email, status, category } = req.body;
    const documents = req.files.map(file => ({
      document_name: file.originalname,
      document: file.buffer
    }));

    const newScheme = new Scheme({
      schemename,
      user_id,
      email,
      status,
      category,
      documents
    });

    await newScheme.save();
    res.status(201).json(newScheme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
