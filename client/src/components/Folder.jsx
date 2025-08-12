import React from 'react';
import { Link } from 'react-router-dom';

const Folder = ({ folder }) => {
  return (
    <div style={{ textAlign: 'center', padding: 12, borderRadius: 12, background: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}>
      <Link to={`/folder/${folder._id}`} style={{ textDecoration: 'none', fontWeight: 600, color: '#1664c7' }}>
        {folder.name}
      </Link>
    </div>
  );
};

export default Folder;
