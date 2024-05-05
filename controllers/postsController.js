

const jwt = require('jsonwebtoken');
const Post = require('../models/posts');
const postService = require('../services/postsService');
const User = require('../models/users');

const createPost = async (req, res) => {
    const { authorization } = req.headers;
  try {
    const token = authorization.split(' ')[1];
      console.log(token);
      const decoded = jwt.verify(token, 'your_secret_key'); 
      const userEmail = decoded.userEmail;
      console.log("userEmail",userEmail);

    const { content, author } = req.body;
    console.log(req.body, content, author);
    // You may want to validate the data here

    const post = await postService.createPost( content, author, userEmail);
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  };


  const deletePost = async (req, res) => {
    const { authorization } = req.headers;
    console.log(req.params.id)
    const postId = req.params.id;
    console.log('postId', postId);
    try {
      const token = authorization.split(' ')[1];
      console.log(token);
      const decoded = jwt.verify(token, 'your_secret_key'); 
      const userEmail = decoded.userEmail;
      console.log(userEmail);
        const post =await Post.findById(postId);
        console.log('Post', post);
  
    console.log('Post.email', post.email);

      if (userEmail == post.email) {

        // Delete the post from the database
        await Post.findByIdAndDelete(postId);
        res.sendStatus(204); // No content (successful deletion)
      } else {
        // If the user is not authorized, return an error
        res.status(403).json({ error: 'You cannot delete this post' });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  };




const updatePost = async (req, res) => {
    console.log('updatePost', req.body);
    const { authorization } = req.headers;
    const postId = req.params.id;
    try {
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'your_secret_key'); 
      const userEmail = decoded.userEmail;
      const post = await Post.findById(postId);
      if (userEmail === post.email) {
        const { content } = req.body;

        await Post.findByIdAndUpdate(postId, { content });
        res.sendStatus(204); 
      } else {
        res.status(403).json({ error: 'You cannot update this post' });
      }
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Failed to update post' });
    }
  }

  const getPost = async (req, res) => {
    console.log('getPost', req.params.id);
    const postId = req.params.id;
    try {
      const post = await Post.findById(postId);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  }














  module.exports = {
    createPost,
    getAllPosts,
    deletePost,
    updatePost,
    getPost,
 
  };
