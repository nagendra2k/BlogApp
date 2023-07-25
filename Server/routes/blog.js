const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const requireLogin = require('../middleware/requireLogin');

router.get('/allblogs', requireLogin, blogController.allblogs);

router.get('/myblogs', requireLogin, blogController.myblogs);

router.get('/blogdetail/:id', requireLogin, blogController.blogdetail);

router.delete('/deleteblog/:id', requireLogin, blogController.deleteBlog);

router.post('/createblog', requireLogin, blogController.create);

router.put('/like', requireLogin, blogController.like);

router.put('/unlike', requireLogin, blogController.unlike);

router.put('/comment', requireLogin, blogController.comment);

module.exports = router;