import React from 'react';

const DownloadLink = ({ downloadUrl }) => {
  return (
    <div>
      {downloadUrl && (
        <div>
          <a href={downloadUrl} download="new_pdf.pdf">Download New PDF</a>
        </div>
      )}
    </div>
  );
};

export default DownloadLink;
