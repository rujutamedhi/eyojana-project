const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');
const upload = require('../middleware/fetchScheme');
router.post('/', upload.array('documents'), async (req, res) => {
  try {
    const { schemename, user_id, email, status, category } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No documents uploaded.' });
    }

    const documents = req.files.map((file, index) => {
      const documentName = req.body[`document_name_${index}`] || file.originalname; 
      return {
        document_name: documentName,
        document: file.buffer, 
      };
    });
    const newScheme = new Scheme({
      schemename,
      user_id,
      email,
      status,
      category,
      documents,
    });
    await newScheme.save();
    res.status(201).json(newScheme);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.status(200).json(schemes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.get('/:schemeId/documents/:documentName', async (req, res) => {
  try {
    const { schemeId, documentName } = req.params;
    const scheme = await Scheme.findById(schemeId);

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    const document = scheme.documents.find(doc => doc.document_name === documentName);
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.set('Content-Type', 'image/jpeg'); // Adjust based on your image type (jpeg, png, etc.)
    res.send(document.document); // Send the image data
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:schemeId', async (req, res) => {
  try {
    const { schemeId } = req.params; // Get the scheme ID from the request params
    const { status } = req.body; // Get the new status from the request body

    // Validate the status
    if (!['approved', 'rejected', 'reverted'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Find the scheme and update its status
    const updatedScheme = await Scheme.findByIdAndUpdate(
      schemeId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedScheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    res.status(200).json(updatedScheme); // Return the updated scheme data
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PATCH route to update scheme status by email and scheme name
router.patch('/update-status/:email/:schemename', async (req, res) => {
  try {
    const { email, schemename } = req.params;
    const { status } = req.body;

    // Find the scheme by email and scheme name
    const scheme = await Scheme.findOne({ email, schemename });

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found for the provided email and scheme name' });
    }

    // Update the scheme's status
    scheme.status = status;
    await scheme.save();

    res.status(200).json({ message: 'Status updated successfully', scheme });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;
