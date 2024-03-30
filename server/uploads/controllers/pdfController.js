const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;

const extractPages = async (filePath, selectedPages) => {
  try {
    const pdfBytes = await fs.readFile(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const newPdfDoc = await PDFDocument.create();

    for (const pageNum of selectedPages) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNum - 1]);
      newPdfDoc.addPage(copiedPage);
    }

    const newPdfBytes = await newPdfDoc.save();
    return newPdfBytes;
  } catch (error) {
    throw new Error('Error extracting pages from PDF');
  }
};

module.exports = {
  extractPages,
};
