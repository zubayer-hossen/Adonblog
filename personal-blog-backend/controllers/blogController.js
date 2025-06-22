const Blog = require('../models/Blog');

// Create new blog (admin only)
const createBlog = async (req, res) => {
  const { title, content, image, category } = req.body;

  const blog = new Blog({
    title,
    content,
    image,
    category,
    author: req.user._id, // from protect middleware
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
};

// Get all blogs (public)
const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().populate('author', 'name');
  res.json(blogs);
};

// Get single blog by ID (public)
const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'name');

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

// Update blog (admin only)
const updateBlog = async (req, res) => {
  const { title, content, image, category } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = image || blog.image;
    blog.category = category || blog.category;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

// Delete blog (admin only)
const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await blog.remove();
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
