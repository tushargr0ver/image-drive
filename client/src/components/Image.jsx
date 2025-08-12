import React from 'react';

const Image = ({ image }) => {
  return (
    <div>
      <img src={`http://localhost:5000/${image.url}`} alt={image.name} width="150" />
      <p>{image.name}</p>
    </div>
  );
};

export default Image;
