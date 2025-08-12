const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const Image = require('../models/Image');

const upload = multer({ dest: 'uploads/' });

// Upload an image
router.post('/', [auth, upload.single('image')], async (req, res) => {
  const { name, folder } = req.body;
  try {
    const newImage = new Image({
      name,
      url: req.file.path,
      user: req.user.id,
      folder,
    });
    const image = await newImage.save();
    res.json(image);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all images for a user
router.get('/', auth, async (req, res) => {
    try {
      const images = await Image.find({ user: req.user.id, folder: null });
      res.json(images);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// Get all images in a folder
router.get('/folder/:folderId', auth, async (req, res) => {
    try {
        const images = await Image.find({ user: req.user.id, folder: req.params.folderId });
        res.json(images);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
