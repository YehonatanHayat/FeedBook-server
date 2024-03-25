
const Post = require('../models/posts');

const createPost = async (title, published) => {
    const post = new Post({ title: title});
    if(published) post.published = published;
    return await post.save();
};

module.exports = {createPost};