import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const CreateFolderModal = ({ isOpen, onClose, parent, onFolderCreated }) => {
  const [name, setName] = useState('');
  const { auth } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const body = JSON.stringify({ name, parent });
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/folders`, body, config);
      onFolderCreated(res.data);
      setName('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs" aria-labelledby="create-folder-title">
      <form onSubmit={onSubmit}>
        <DialogTitle id="create-folder-title">Create Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Folder Name"
            type="text"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={submitting}>Cancel</Button>
          <Button type="submit" disabled={submitting || !name.trim()}>Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateFolderModal;
