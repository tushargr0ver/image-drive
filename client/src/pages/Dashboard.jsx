import React, { useEffect, useState, useContext, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { SearchContext } from '../context/SearchContext';
import Folder from '../components/Folder';
import Image from '../components/Image';
import CreateFolderModal from '../components/CreateFolderModal';
import UploadImageModal from '../components/UploadImageModal';
import ItemGrid from '../components/ItemGrid';
import { Button, Stack, Typography } from '@mui/material';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const { searchTerm } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const fetchRootItems = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const foldersRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/folders`, config);
      const imagesRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/images`, config);

      const rootFolders = foldersRes.data.filter(f => f.parent === null);
      const rootImages = imagesRes.data.filter(i => i.folder === null);

      setItems([...rootFolders, ...rootImages]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (auth.token) {
      fetchRootItems();
    }
  }, [auth.token]);

  const onFolderCreated = (folder) => {
    setItems([...items, folder]);
  };

  const onImageUploaded = (image) => {
    setItems([...items, image]);
  };

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(item => (item.name || '').toLowerCase().includes(term));
  }, [items, searchTerm]);

  return (
    <div>
      <Typography variant="h1" sx={{ fontSize: 32, mb: 2 }}>Dashboard</Typography>
      <Stack direction="row" spacing={2} mb={2}>
        <Button size="small" onClick={() => setFolderModalOpen(true)}>Create Folder</Button>
        <Button size="small" color="secondary" onClick={() => setImageModalOpen(true)}>Upload Image</Button>
      </Stack>
      <CreateFolderModal 
        isOpen={isFolderModalOpen} 
        onClose={() => setFolderModalOpen(false)} 
        onFolderCreated={onFolderCreated}
      />
      <UploadImageModal 
        isOpen={isImageModalOpen} 
        onClose={() => setImageModalOpen(false)}
        onImageUploaded={onImageUploaded}
      />
      {filteredItems.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 3 }}>No items {searchTerm ? 'match your search.' : 'yet. Create or upload to get started.'}</Typography>
      ) : (
        <ItemGrid>
          {filteredItems.map((item) =>
            item.url ? <Image key={item._id} image={item} /> : <Folder key={item._id} folder={item} />
          )}
        </ItemGrid>
      )}
    </div>
  );
};

export default Dashboard;
