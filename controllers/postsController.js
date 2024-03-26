
// const postService = require('../services/posts');

// const createPost = async (req, res) => {
//     res.json(await postService.createPost(req.body.title));
// };

// module.exports = {createPost};

const postService = require('../services/postsService');

const createPost = async (req, res) => {
    try {
        console.log('createPost');
        console.log( req.body);
        const { title, author, content } = req.body;
        const post = await postService.createPost({ title, author, content });
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createPost };
