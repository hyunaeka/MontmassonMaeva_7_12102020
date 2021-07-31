const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/postCtrl');
const multer = require('../middleware/multer-config');



router.post('/new', multer, postsCtrl.savePost);
router.put('/modify-post/:id', multer, postsCtrl.modifyPost);
router.delete('/delete/:id', postsCtrl.deletePost);
router.get('/all', postsCtrl.getAllPost);
router.get("/userPost/:id", postsCtrl.getOnePost);

module.exports = router;