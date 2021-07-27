const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/commentsCtrl');


router.post('/create/:idPost', commentsCtrl.saveComment);
router.delete('/delete/:idComment', commentsCtrl.deleteComment);

module.exports = router;