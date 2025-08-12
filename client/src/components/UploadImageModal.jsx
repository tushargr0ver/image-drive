import React, { useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, LinearProgress } from '@mui/material';

const UploadImageModal = ({ isOpen, onClose, folder, onImageUploaded }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const { token } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((accepted) => {
    if (accepted && accepted[0]) {
      setFile(accepted[0]);
      if (!name.trim()) {
        const base = accepted[0].name.replace(/\.[^.]+$/, '');
        setName(base);
      }
    }
  }, [name]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop,
  });

  const onPaste = (e) => {
    const f = e.clipboardData.files?.[0];
    if (f && f.type.startsWith('image/')) {
      setFile(f);
      if (!name.trim()) {
        const base = f.name.replace(/\.[^.]+$/, '');
        setName(base);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setSubmitting(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', file);
    if (folder) formData.append('folder', folder);

    try {
      const res = await axios.post('/api/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        onUploadProgress: (evt) => {
          if (evt.total) {
            const pct = Math.round((evt.loaded / evt.total) * 100);
            setUploadProgress(pct);
          }
        }
      });
      onImageUploaded(res.data);
      setName('');
      setFile(null);
      setUploadProgress(0);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs" aria-labelledby="upload-image-title" onPaste={onPaste}>
      <form onSubmit={onSubmit}>
        <DialogTitle id="upload-image-title">Upload Image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Image Name"
            type="text"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'divider',
              bgcolor: isDragActive ? 'action.hover' : 'background.paper',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'background-color .2s, border-color .2s'
            }}
          >
            <input {...getInputProps()} />
            {!file && (
              <Typography variant="body2" color="text.secondary">
                {isDragActive ? 'Drop the image here…' : 'Drag & drop image, click to browse, or paste from clipboard'}
              </Typography>
            )}
            {file && (
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{file.name}</Typography>
                <Typography variant="caption" color="text.secondary">{(file.size / 1024).toFixed(1)} KB</Typography>
                {file.type.startsWith('image/') && (
                  <Box mt={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      style={{ maxWidth: '100%', maxHeight: 160, borderRadius: 8, objectFit: 'contain' }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
          {submitting && uploadProgress > 0 && (
            <Box mt={2}>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>{uploadProgress}%</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={submitting}>Cancel</Button>
            <Button type="submit" disabled={submitting || !file || !name.trim()}>{submitting ? 'Uploading…' : 'Upload'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UploadImageModal;
