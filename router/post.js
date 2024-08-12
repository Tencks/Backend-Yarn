const express = require('express');
const PostController = require('../controllers/post');
const multiparty = require('connect-multiparty');
const md_auth = require('../middlewares/authenticated');

const md_upload = multiparty({ uploadDir: './uploads/blog'});
const api = express.Router();

api.post('/post', [md_auth.asureAuth, md_upload], PostController.createPost)
api.get('/posts', [], PostController.getPosts);
api.get('/post/:path', [],PostController.getPost);
api.patch('/post/:id', [md_auth.asureAuth, md_upload], PostController.updatePost );
api.delete('/post/:id', [md_auth.asureAuth], PostController.deletePost)

module.exports = api;