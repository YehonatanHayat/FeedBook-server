
// const postService = require('../services/posts');

// const createPost = async (req, res) => {
//     res.json(await postService.createPost(req.body.title));
// };

// module.exports = {createPost};

// const postService = require('../services/postsService');

// const createPost = async (req, res) => {
//     try {
//         console.log('createPost');
//         const { title, author, content } = req.body;
//         const post = await postService.createPost({ title, author, content });
//         res.json(post);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = { createPost };
const jwt = require('jsonwebtoken');
const Post = require('../models/posts');
const postService = require('../services/postsService');

const createPost = async (req, res) => {
  try {
    const { content, author } = req.body;
    console.log(req.body, content, author);
    // You may want to validate the data here

    const post = await postService.createPost({ content, author });
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
    const postId = req.params.id;
    const { authorization } = req.headers;
  
    try {
      // Verify the token and extract the payload
      const token = authorization.split(' ')[1];
      console.log(token);
      const decoded = jwt.verify(token, 'your_secret_key'); 
      const userName = decoded.name;
      console.log(user.name);
  
      // Check if the user's name matches the author of the post
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      if (userName === post.author) {
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




  module.exports = {
    createPost,
    getAllPosts,
    deletePost,
  };
