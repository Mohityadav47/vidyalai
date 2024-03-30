const express = require('express');
const router = express.Router();
const multer = require('multer');
const { extractPages } = require('../controllers/pdfController');

const uploadPath = 'uploads/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Upload PDF file
router.post('/upload', upload.single('pdfFile'), (req, res) => {
  res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

// Retrieve PDF file
router.get('/file/:filename', async (req, res) => {
  const { filename } = req.params;
  const filePath = `${uploadPath}${filename}`;
  try {
    const fileContent = await fs.readFile(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(fileContent);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the file' });
  }
});

// Extract selected pages and create a new PDF
router.post('/extract', upload.single('pdfFile'), async (req, res) => {
  try {
    const { filename, pages } = req.body;
    const selectedPages = pages.split(',').map((page) => parseInt(page.trim()));
    const newPdfBytes = await extractPages(`${uploadPath}${filename}`, selectedPages);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(newPdfBytes);
  } catch (error) {
    console.error('Error extracting pages:', error);
    res.status(500).json({ error: 'An error occurred while extracting pages' });
  }
});

module.exports = router;
