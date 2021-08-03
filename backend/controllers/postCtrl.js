const jwtUtils = require('../utils/utils');
const models = require('../models');
const fs = require('fs');



/************************************************************************* CREATE POST *******************************************************************************/
module.exports = {
    
savePost: async function (req, res){

    const HeaderAuth = await req.headers['authorization'];
    const userId = await jwtUtils.getUserId(HeaderAuth);

    const title = req.body.title; 
    const content = req.body.content; 
    let imageUrl = "";




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

            if (req.file) {
                imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            } else {
                imageUrl = null;
            }

            let user = await models.User.findOne({ where: {id : userId} })
            let newPost = await models.Post.create({

               title : title,
               userName : user.username,
               content : content,
               attachment : imageUrl,
               UserId : user.id,
               
               
            }) ;
            return res.status(201).json({ newPost : newPost }) 

        }else{
            res.status(404).json({ 'error': 'Utilisateur introuvable' });
        }

    }).catch(function (err) {
        return res.status(500).json({ 'error': err });
    });
},

/************************************************************************* MODIFY POST *******************************************************************************/

modifyPost: async function (req, res) {

    const HeaderAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(HeaderAuth);
    let newImageUrl;

    if (userId < 0)
        return res.status(400).json({ 'error': 'invalide Token' })

    await models.User.findOne({
        where: { id: userId }

    }).then(async function (user) {

        if (user) {

            await models.Post.findOne({ where: { id: req.params.id }
            })
            .then(async function (post) {

                if (post) { 

                    if (req.file) {
                        newImageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

                        if (post.attachment) {
                            const filename = post.attachment.split("/images")[1];
                            fs.unlink(`images/${filename}`, (err) => {

                              if (err) console.log(err);

                              else {
                                console.log(`Deleted file: images/${filename}`);
                              }
                            });
                          }

                        };

                    if (req.file) {
                    post.attachment = newImageUrl
                };
                    if (req.body.title){

                        post.title = req.body.title
                    };
                    if (req.body.content){
                        post.content = req.body.content

                    };
                    const newPost = await post.save({ fields: ['title','content','attachment']});
                        return res.status(200).json({
                            post: newPost
                        });
                }
                else {
                   return res.status(404).json({ 'error': 'Impossible de récupérer le post' });
                }
            }).catch(function (err) {
               return res.status(500).json({ 'error': err })
            });
        } else {
           return res.status(404).json({ 'error': 'Utilisateur non reconnu' });
        }
    }).catch(function (err) {
       return res.status(500).json({ 'error': err })
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
                    if (post.attachment) {
                        const filename = post.attachment.split("/images")[1];
                        fs.unlink(`images/${filename}`, () => {
                            models.Post.destroy({ where: { id: post.id } })
                            res.status(200).json({ message: "Publication supprimée" });
                        });
                    } else {
                        await models.Post.destroy({
                            where: { id: post.id }});
                        return res.status(200).json({ message: "Publication supprimée" });
                    }
                }
                else {
                    return res.status(404).json({ 'error': 'Impossible de supprimer le post' });
                }
            }).catch(function (err) {
                return res.status(500).json({ 'error': err })
            });
        } else {
            return res.status(404).json({ 'error': 'Probléme authentification' });
        }
    }).catch(function (err) {
        return res.status(500).json({ 'error': err })
    });
},

/************************************************************************* All POSTS *******************************************************************************/

getAllPost: async function (req, res) {

    const HeaderAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(HeaderAuth);


    await models.Post.findAll().then(allPost => res.send(allPost))

},

/************************************************************************* ONE POST AND COMMENTS *******************************************************************************/

getOnePost: async function (req, res) {

    const HeaderAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(HeaderAuth);

        if (userId < 0)
            return res.status(400).json({ 'error': 'invalide Token' })
       
            await models.Post.findOne({
            attributes: ['id', 'title', 'userName', 'userId', 'content', 'attachment'],
            where: { id: req.params.id },
        }).then(async function (post) {
            await models.User.findOne({ 
                attributes: ['userName'],
                where: { id: userId }
            }).then(async function () {
                await models.Comment.findAll({
                    attributes: ['comment', 'userName','id', 'userId'],
                    where: { postId: req.params.id },
                })
                    .then(function (comment) {
                        const getOne = { post, comment }
                        res.status(200).json(getOne)
                    }).catch(function (err) {
                        res.status(500).json({ 'error': err })
                    });
            }).catch(function (err) {
                res.status(500).json({ 'error': err })
            });
        }).catch(function (err) {
            res.status(500).json({ 'error': err })
        });

}





}

