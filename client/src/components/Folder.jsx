import React from 'react';
import { Link } from 'react-router-dom';

const Folder = ({ folder }) => {
  return (
    <div>
      <Link to={`/folder/${folder._id}`}>{folder.name}</Link>
    </div>
  );
};

export default Folder;
