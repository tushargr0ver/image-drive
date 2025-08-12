import React from 'react';

const Image = ({ image }) => {
  return (
    <div style={{ textAlign: 'center', padding: 12, borderRadius: 12, background: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
      <img
        src={`${import.meta.env.VITE_API_URL}/${image.url}`}
        alt={image.name}
        width="150"
        height="150"
        loading="lazy"
        style={{ objectFit: 'cover', borderRadius: 8, aspectRatio: '1 / 1', display: 'block', margin: '0 auto' }}
      />
      <p style={{ marginTop: 8, fontSize: 14, fontWeight: 500 }}>{image.name}</p>
    </div>
  );
};

export default Image;
