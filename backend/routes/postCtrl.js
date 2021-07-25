const jwtUtils = require('../utils/utils');
const models = require('../models');



/************************************************************************* CREATE POST *******************************************************************************/
module.exports = {
    
savePost: async function (req, res){

    const HeaderAuth = await req.headers['authorization'];
    const userId = await jwtUtils.getUserId(HeaderAuth);

    const title = req.body.title; 
    const content = req.body.content; 
    const atachement = req.body.atachement; 


    if (title == null || content == null) {
        return res.status(400).json({ 'error': 'remplir le titre et la description' });
    }
    if (title.lenght < 2 || title.lenght > 30 || content.length < 2) {
        return res.status(400).json({ 'error': ' Titre ou contenu trop court !' })
    }

    await models.User.findOne({
        where: { id: userId }

    }).then(async function(user){

        if(user){
            let user = await models.User.findOne({ where: {id : userId} })
            let newPost = await models.Post.create({

               title : title,
               userName : user.username,
               content : content,
               atachement : atachement,
               UserId : user.id,
               
               
            }) ;
            return res.status(201).json({ newPost : newPost }) 

        }else{
            res.status(404).json({ 'error': 'Utilisateur introuvable' });
        }

    }).catch(function (err) {
        return res.status(500).json({ 'error': 'Impossible de créer la publication' });
    });
},

/************************************************************************* MODIFY POST *******************************************************************************/

modifyPost: async function (req, res) {

    const HeaderAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(HeaderAuth);

    if (userId < 0)
        return res.status(400).json({ 'error': 'invalide Token' })

    await models.User.findOne({
        where: { id: userId }

    }).then(async function (user) {

        if (user) {

            await models.Post.findOne({
                where: { id: req.params.id }
            }).then(async function (post) {

                if (post) {
                    if (req.body.title){
                        post.title = req.body.title
                    };
                    if (req.body.content){
                        post.content = req.body.content
                    };
                    if (req.body.attachement){
                        post.attachement = req.body.attachement
                    };
                    const newPost = await post.save({ fields: ['title','content','attachement']});
                        return res.status(200).json({
                            post: newPost,
                            messageRetour: "Changement enregistré"
                        });
                }
                else {
                   return res.status(404).json({ 'error': 'Impossible de récupérer le post' });
                }
            }).catch(function (err) {
               return res.status(500).json({ 'error': 'error changement' })
            });
        } else {
           return res.status(404).json({ 'error': 'Utilisateur non reconnu' });
        }
    }).catch(function (err) {
       return res.status(500).json({ 'error': 'error code' })
    });
},

/************************************************************************* DELETE POST *******************************************************************************/
deletePost: async function (req, res) {

    const HeaderAuth = req.headers['authorization'];
    const userId = await jwtUtils.getUserId(HeaderAuth);
    const isAdmin = await jwtUtils.getUserAdmin(HeaderAuth);
    const idPost = await models.Post.findOne({ where : { id : req.params.id}})

    if (userId < 0)
        return res.status(400).json({ 'error': 'invalide Token' })

    await models.User.findOne({

        where: { id: userId }

    }).then(async function () {

        if ( userId === idPost.UserId || isAdmin == true) {

            await models.Post.findOne({
                where: { id: req.params.id }

            }).then(async function (post) {

                if (post) {
                    await models.Post.destroy({
                         where: { id: post.id }});
                    return res.status(200).json({ message: "Le post a bien été supprimé" });
                }
                else {
                    return res.status(404).json({ 'error': 'Impossible de supprimer le post' });
                }
            }).catch(function (err) {
                return res.status(500).json({ 'error': 'server erreur' })
            });
        } else {
            return res.status(404).json({ 'error': 'Probléme authentification' });
        }
    }).catch(function (err) {
        return res.status(500).json({ 'error': 'error' })
    });
},

/************************************************************************* All POSTS *******************************************************************************/

getAllPost: async function (req, res) {
    await models.Post.findAll().then(allPost => res.send(allPost))

}




}
