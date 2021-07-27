const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/postCtrl');



router.post('/new', postsCtrl.savePost);
router.put('/modify-post/:id', postsCtrl.modifyPost);
router.delete('/delete/:id', postsCtrl.deletePost);
router.get('/all', postsCtrl.getAllPost);
router.get("/userPost/:id", postsCtrl.getOnePost);

module.exports = router;