
const Post = require('../models/posts');

const createPost = async (title) => {
    const post = new Post({ title: title});
    return await post.save();
};

module.exports = {createPost};