import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CreateFolderModal = ({ isOpen, onClose, parent, onFolderCreated }) => {
  const [name, setName] = useState('');
  const { auth } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const body = JSON.stringify({ name, parent });
      const res = await axios.post('http://localhost:5000/api/folders', body, config);
      onFolderCreated(res.data);
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
            placeholder="Folder Name"
            required
          />
          <button type="submit">Create Folder</button>
        </form>
      </div>
    </div>
  );
};

export default CreateFolderModal;
