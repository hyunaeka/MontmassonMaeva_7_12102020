const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersCtrl');

router.post('/register/', userController.register);
router.post('/login/', userController.login);
router.get('/me', userController.getUserProfile);
router.put('/myprofile',userController.updateUserProfile);
router.delete('/deleteMe',userController.deleteUser);

module.exports = router;
