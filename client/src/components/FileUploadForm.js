import React from 'react';

const FileUploadForm = ({ onFileChange }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploadForm;
