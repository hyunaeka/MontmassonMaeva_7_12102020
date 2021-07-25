//imports 

const express = require('express');
const usersCrtl = require('./routes/usersCrtl');
const postsCtrl = require('./routes/postCtrl');
const commentsCtrl = require('./routes/commentsCtrl');

exports.router = (function(){

    const appRouter = express.Router();

    //Users routes 

appRouter.route('/users/register/').post(usersCrtl.register);
appRouter.route('/users/login/').post(usersCrtl.login);
appRouter.route('/users/me').get(usersCrtl.getUserProfile);
appRouter.route('/users/myprofile').put(usersCrtl.updateUserProfile);

    //Posts routes

appRouter.route('/posts/new').post(postsCtrl.savePost);
appRouter.route('/posts/modify-post/:id').put(postsCtrl.modifyPost);
appRouter.route('/posts/delete/:id').delete(postsCtrl.deletePost);
appRouter.route('/posts/all').get(postsCtrl.getAllPost);

    // Comments routes

appRouter.route('/comments/create/:idPost').post(commentsCtrl.saveComment);
appRouter.route('/comments/delete/:idComment').delete(commentsCtrl.deleteComment);


return appRouter;

})();

