import React from 'react';

const PageSelection = ({ numPages, selectedPages, onPageToggle }) => {
  const handlePageToggle = (page) => {
    onPageToggle(page);
  };

  return (
    <div>
      {[...Array(numPages).keys()].map((page) => (
        <label key={page + 1}>
          <input
            type="checkbox"
            checked={selectedPages.includes(page + 1)}
            onChange={() => handlePageToggle(page + 1)}
          />
          Page {page + 1}
        </label>
      ))}
    </div>
  );
};

export default PageSelection;
