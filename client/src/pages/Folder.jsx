import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { SearchContext } from '../context/SearchContext';
import Folder from '../components/Folder';
import Image from '../components/Image';
import CreateFolderModal from '../components/CreateFolderModal';
import UploadImageModal from '../components/UploadImageModal';

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
      const folderRes = await axios.get(`http://localhost:5000/api/folders/${folderId}`, config);
      const imagesRes = await axios.get(`http://localhost:5000/api/images/folder/${folderId}`, config);
      
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
      <h1>{folder.name}</h1>
      <button onClick={() => setFolderModalOpen(true)}>Create Subfolder</button>
      <button onClick={() => setImageModalOpen(true)}>Upload Image</button>
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
      <div>
        {filteredItems.map((item) =>
          <Image key={item._id} image={item} />
        )}
      </div>
    </div>
  );
};

export default FolderPage;
