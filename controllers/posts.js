
const postService = require('../services/posts');

const createPost = async (req, res) => {
    res.json(await postService.createPost(req.body.title));
};

module.exports = {createPost};