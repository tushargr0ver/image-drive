import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { SearchContext } from '../context/SearchContext';
import Folder from '../components/Folder';
import Image from '../components/Image';
import CreateFolderModal from '../components/CreateFolderModal';
import UploadImageModal from '../components/UploadImageModal';
import ItemGrid from '../components/ItemGrid';
import { Button, Stack, Typography, Breadcrumbs, Link as MLink } from '@mui/material';
import { Link } from 'react-router-dom';

const FolderPage = () => {
  const { folderId } = useParams();
  const { auth } = useContext(AuthContext);
  const { searchTerm } = useContext(SearchContext);
  const [folder, setFolder] = useState(null);
  const [items, setItems] = useState([]);
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const fetchFolderContents = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const folderRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/folders/${folderId}`, config);
      const imagesRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/images/folder/${folderId}`, config);

      setFolder(folderRes.data);
      setItems(imagesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (auth.token) {
      fetchFolderContents();
    }
  }, [auth.token, folderId]);

  const onFolderCreated = (newFolder) => {
    // This should ideally re-fetch or update state appropriately
  };

  const onImageUploaded = (image) => {
    setItems([...items, image]);
  };

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(item => (item.name || '').toLowerCase().includes(term));
  }, [items, searchTerm]);

  if (!folder) return <div>Loading...</div>;

  return (
    <div>
      <Breadcrumbs sx={{ mb: 1 }}>
        <MLink component={Link} underline="hover" color="inherit" to="/">Root</MLink>
        <Typography color="text.primary">{folder.name}</Typography>
      </Breadcrumbs>
      <Typography variant="h2" sx={{ fontSize: 28, mb: 2 }}>{folder.name}</Typography>
      <Stack direction="row" spacing={2} mb={2}>
        <Button size="small" onClick={() => setFolderModalOpen(true)}>Create Subfolder</Button>
        <Button size="small" color="secondary" onClick={() => setImageModalOpen(true)}>Upload Image</Button>
      </Stack>
      <CreateFolderModal 
        isOpen={isFolderModalOpen} 
        onClose={() => setFolderModalOpen(false)} 
        parent={folderId}
        onFolderCreated={onFolderCreated}
      />
      <UploadImageModal 
        isOpen={isImageModalOpen} 
        onClose={() => setImageModalOpen(false)}
        folder={folderId}
        onImageUploaded={onImageUploaded}
      />
      {filteredItems.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 3 }}>No images {searchTerm ? 'match your search.' : 'in this folder yet.'}</Typography>
      ) : (
        <ItemGrid>
          {filteredItems.map((item) =>
            <Image key={item._id} image={item} />
          )}
        </ItemGrid>
      )}
    </div>
  );
};

export default FolderPage;
