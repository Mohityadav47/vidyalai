import React from 'react';

const NewPdfButton = ({ onCreatePdf }) => {
  return (
    <div>
      <button onClick={onCreatePdf}>Create New PDF</button>
    </div>
  );
};

export default NewPdfButton;
