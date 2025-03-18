const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/', (req, res) => {
  res.send('Welcome to the blog page');
});

router.post('/post', async (req, res) => {
  try {
    const { title, content,author } = req.body;
    const newblog = Blog.create({ title, content,author });
    res.status(201).json(newblog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/all', async (req, res) => {
      try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
      } catch (error) {
        res.status(500).json({ message: error.message });
  }
});  


module.exports = router;