
// const Post = require('../models/posts');

// const createPost = async (title) => {
//     const post = new Post({ title: title});
//     return await post.save();
// };

// module.exports = {createPost};

const Post = require('../models/posts');

const createPost = async ({ content, author,date }) => {
  const post = new Post({ content, author, date});
  return await post.save();
};

module.exports = { createPost };
