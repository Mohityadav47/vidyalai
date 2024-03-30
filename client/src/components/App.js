"use client"
import React, { useState } from 'react';
import axios from 'axios';
import FileUploadForm from './components/FileUploadForm';
import PageSelection from './components/PageSelection';
import NewPdfButton from './components/NewPdfButton';
import DownloadLink from './components/DownloadLink';

const App = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileChange = (file) => {
    setFile(file);
    setSelectedPages([]);
    setDownloadUrl('');
    // Extract pages for visual representation
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const pdfData = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      setNumPages(pdf.numPages);
    };
  };

  const handlePageToggle = (page) => {
    const selectedIndex = selectedPages.indexOf(page);
    if (selectedIndex === -1) {
      setSelectedPages([...selectedPages, page]);
    } else {
      setSelectedPages(selectedPages.filter((p) => p !== page));
    }
  };

  const handleCreatePdf = async () => {
    try {
      const formData = new FormData();
      formData.append('pdfFile', file);
      formData.append('pages', selectedPages.join(','));

      const response = await axios.post('/extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setDownloadUrl(pdfUrl);
    } catch (error) {
      console.error('Error creating new PDF:', error);
    }
  };

  return (
    <div>
      <h1>PDF Page Extractor</h1>
      <FileUploadForm onFileChange={handleFileChange} />
      <PageSelection numPages={numPages} selectedPages={selectedPages} onPageToggle={handlePageToggle} />
      <NewPdfButton onCreatePdf={handleCreatePdf} />
      <DownloadLink downloadUrl={downloadUrl} />
    </div>
  );
};

export default App;
