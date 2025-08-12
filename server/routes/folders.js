const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Folder = require('../models/Folder');

// Create a folder
router.post('/', auth, async (req, res) => {
  const { name, parent } = req.body;
  try {
    const newFolder = new Folder({
      name,
      user: req.user.id,
      parent,
    });
    const folder = await newFolder.save();
    res.json(folder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all folders for a user
router.get('/', auth, async (req, res) => {
    try {
      const folders = await Folder.find({ user: req.user.id, parent: null });
      res.json(folders);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// Get a specific folder
router.get('/:id', auth, async (req, res) => {
    try {
        const folder = await Folder.findOne({ _id: req.params.id, user: req.user.id });
        if (!folder) {
            return res.status(404).json({ msg: 'Folder not found' });
        }
        res.json(folder);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
