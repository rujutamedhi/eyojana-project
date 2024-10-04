// const express = require('express');
// const router = express.Router();
// const Scheme = require('../models/Scheme');
// const upload = require('../middleware/fetchScheme'); // Assuming this is your multer setup

// // Create a new scheme with documents
// router.post('/', upload.array('documents'), async (req, res) => {
//   try {
//     const { schemename, user_id, email, status, category } = req.body;

//     // Check if documents were uploaded
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: 'No documents uploaded.' });
//     }

//     // Prepare documents array with names
//     const documents = req.files.map((file, index) => {
//       const documentName = req.body[`document_name_${index}`] || file.originalname; // Use provided name or fall back to original name
//       return {
//         document_name: documentName,
//         document: file.buffer,
//       };
//     });

//     // Create a new scheme object
//     const newScheme = new Scheme({
//       schemename,
//       user_id,
//       email,
//       status,
//       category,
//       documents,
//     });

//     // Save the new scheme to the database
//     await newScheme.save();
//     res.status(201).json(newScheme);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const schemes = await Scheme.find();
//     res.status(200).json(schemes);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// router.get('/:schemeId/documents/:documentName', async (req, res) => {
//   try {
//     const { schemeId, documentName } = req.params;
//     const scheme = await Scheme.findById(schemeId);

//     if (!scheme) {
//       return res.status(404).json({ message: 'Scheme not found' });
//     }

//     // Find the requested document in the scheme
//     const document = scheme.documents.find(doc => doc.document_name === documentName);
    
//     if (!document) {
//       return res.status(404).json({ message: 'Document not found' });
//     }

//     // Set the content type based on the file type (you might want to store this info)
//     res.set('Content-Type', 'image/jpeg'); // Adjust based on your image type
//     res.send(document.document);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });


// module.exports = router;


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
        document: file.buffer, // Buffer to store image data
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

// Fetch all schemes
router.get('/', async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.status(200).json(schemes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Fetch a specific document by scheme ID and document name
router.get('/:schemeId/documents/:documentName', async (req, res) => {
  try {
    const { schemeId, documentName } = req.params;
    const scheme = await Scheme.findById(schemeId);

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    // Find the requested document in the scheme
    const document = scheme.documents.find(doc => doc.document_name === documentName);
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Set the content type based on the file type (adjust if necessary)
    res.set('Content-Type', 'image/jpeg'); // Adjust based on your image type (jpeg, png, etc.)
    res.send(document.document); // Send the image data
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
