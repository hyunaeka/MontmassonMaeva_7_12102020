const jwtUtils = require('../utils/utils');
const models = require('../models');

module.exports = {

    saveComment: async function (req, res) {

        const HeaderAuth = await req.headers['authorization'];
        const userId = await jwtUtils.getUserId(HeaderAuth);

        const postid = req.params.id
 
        if (postid <= 0) {
            return res.status(400).json({ 'error': ' Aucun post trouvé' })
        }

        await models.User.findOne({
            where: { id: userId }

        }).then(async function (user) {
            if (user) {
                let newComment = await models.Comment.create({ 
                    postId : parseInt(req.params.idPost),
                    userId : userId,
                    userName : user.username,
                    comment: req.body.comment
                 }) 
                 
                 return res.status(201).json({ newComment, message : "commentaire créé" })

            }else{
                res.status(404).json({ 'error': 'utilisateur invalide' });
            }

        }).catch(function (err) {
            return res.status(500).json({ 'error': 'error' });
        });
    },


    deleteComment: async function (req, res){

        const HeaderAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(HeaderAuth);
        const isAdmin = await jwtUtils.getUserAdmin(HeaderAuth);
        const idComment = await models.Comment.findOne({ where: { id: req.params.idComment } })

        if (userId < 0)
            return res.status(400).json({ 'error': 'invalide Token' })

        await models.User.findOne({
            where: { id: userId }

        }).then(async function () {
            if (userId === idComment.userId || isAdmin == true) {
                await models.Comment.findOne({
                    where: { id: req.params.idComment }

                }).then(async function (comments) {
                    if (comments) {
                        await models.Comment.destroy({
                            where: { id: comments.id },
                        })
                        return res.status(200).json({ message: "commentaire supprimé" });
                    } else {
                        return res.status(404).json({ 'error': 'Erreur dans la suppression du post' });
                    }
                }).catch(function (err) {
                    return res.status(500).json({ 'error': 'server erreur' })
                });
            } else {
                return res.status(404).json({ 'error': 'Erreur identification' });
            }
        }).catch(function (err) {
            return res.status(500).json({ 'error': 'server erreur' })
        });

    }


}