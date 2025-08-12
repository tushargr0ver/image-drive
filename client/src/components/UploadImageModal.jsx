import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const UploadImageModal = ({ isOpen, onClose, folder, onImageUploaded }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const { auth } = useContext(AuthContext);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', file);
    if (folder) {
      formData.append('folder', folder);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const res = await axios.post('http://localhost:5000/api/images', formData, config);
      onImageUploaded(res.data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Image Name"
            required
          />
          <input type="file" onChange={onFileChange} required />
          <button type="submit">Upload Image</button>
        </form>
      </div>
    </div>
  );
};

export default UploadImageModal;
