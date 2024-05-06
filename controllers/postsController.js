

const jwt = require('jsonwebtoken');
const Post = require('../models/posts');
const postService = require('../services/postsService');
const User = require('../models/users');

const createPost = async (req, res) => {
    const { authorization } = req.headers;

  try {
    console.log('createPost', req.body);
    const token = authorization.split(' ')[1];
      console.log(token);
      const decoded = jwt.verify(token, 'your_secret_key'); 
      const userEmail = decoded.userEmail;
      console.log("userEmail",userEmail);

    const { content, author, photo:photo } = req.body;
    console.log('pic', photo);


    const post = await postService.createPost( content, author, userEmail,photo);
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// const getAllPosts = async (req, res) => {
//   const { user } = req.body;
//   console.log('getAllPosts', user); 
//   try {
//     const posts = await Post.find().sort({ date: -1 }); 
//     res.status(200).json(posts); 
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     res.status(500).json({ error: 'Failed to fetch posts' });
//   }
// };




const getAllPosts = async (req, res) => {
  const { authorization } = req.headers;

  try {
    // Extract user email from the authorization token
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'your_secret_key');
    const userEmail = decoded.userEmail;
    console.log('userEmail-getAllPosts', userEmail);

    const user = await User.findOne({ email: userEmail });
    const userFriends = user.friends;
    console.log('userfriends', userFriends);


   
    const userPosts = await Post.find({ email: userEmail }).sort({ date: -1 });
    const friendPosts = await Post.find({ email: { $in: userFriends } }).sort({ date: -1 }).limit(20);
    const nonFriendPosts = await Post.find({ email: { $nin: [...userFriends, userEmail] } }).sort({ date: -1 }).limit(5);


    const posts = [...userPosts, ...friendPosts, ...nonFriendPosts];
    posts.sort((a, b) => b.date - a.date);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts$$$$$$$$$:', error);
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

  // const getPost = async (req, res) => {
  //   console.log('getPost', req.params.id);
  //   const postId = req.params.id;
  //   try {
  //     const post = await Post.findById(postId);
  //     if (post) {
  //       res.json(post);
  //     } else {
  //       res.status(404).json({ error: 'Post not found' });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching post!!!!!:', error);
  //     res.status(500).json({ error: 'Failed to fetch post' });
  //   }
  // }


  // const getPosts = async (req, res) => {
  //   console.log('getPosts', req.body);
  //   try {
  //     const { authorization } = req.headers;
  //     const token = authorization.split(' ')[1];
  //     const decoded = jwt.verify(token, 'your_secret_key'); 
  //     const userEmail = decoded.userEmail;
      
  
  //     const user = await User.findOne({ email: userEmail }).exec();
  //     console.log('user', user.email);
  //     console.log('user.friends', user.friends);
  //     const userFriends = user.friends.map(friend => friend.email);
      
  //     // Fetch posts from the user and their friends
  //     const posts = await Post.find({ $or: [{ email: userEmail }, { email: { $in: userFriends } }] }).exec();
  
  //     res.json(posts);
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //     res.status(500).json({ error: 'Failed to fetch posts' });
  //   }
  // };
  




  module.exports = {
    createPost,
    getAllPosts,
    deletePost,
    updatePost,
   // getPost,
    //getPosts,
 
  };
