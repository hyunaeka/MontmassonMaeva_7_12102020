const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/utils');
const models = require('../models');

const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

module.exports = {


    /***************************************************************************** SIGNUP*********************************************************************/

    register: async function(req, res){

         // Params
    const email    = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const bio      = req.body.bio;

    if (email == null || username == null || password == null) {
      return res.status(400).json({ 'error': 'Veuillez remplir le champ de saisi' });
    } //verify 

    if(username.length >= 13 || username.length <= 4){
        return res.status(400).json({'error': 'le pseudo est trop petit'});
    }
    if(!email_regex.test(email)){
        return res.status(400).json({'error': 'email invalide'});

    }
 
    models.User.findOne({
        attributes: ['email'],
        where: { email: email }
      })
      .then(function(userFound) {
        if(!userFound){

            bcrypt.hash(password, 5, function (err, bcryptedPassword){
                const newUser = models.User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    bio: bio,
                    isAdmin: 0
                })
                .then(function(newUser){
                    return res.status(201).json({
                        'userId': newUser.id
                    })
                })
                .catch(function(err) {
                    return res.status(500).json({'error': err});
                  });
            });
            
        }else{
            return res.status(409).json({'error': 'Email déjà utilisé'});
        }
      })
    },

    /*****************************************************************************LOGIN *********************************************************************/

    login: function(req, res ){

        const email = req.body.email;
        const password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'Le mot de passe ou email est incomplet' });
          } //verify 

          models.User.findOne({
              where: { email: email }
          })
          .then(function(userFound){
              if(userFound){

                bcrypt.compare(password, userFound.password, function(errBcrypt, resBycrypt){
                    if(resBycrypt){
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    } else {
                        return res.status(403).json({'error' : 'invalide'});
                    }
                })

              } else {
                  return res.status(404).json({'error':'Utilisateur inexistant'});
              }

          })
          .catch(function(err){
              return res.status(500).json({'error' : 'Impossible de vérifier utilisateur'});
          });    
          

    },
    /***************************************************************************** GET PROFILE *********************************************************************/
    getUserProfile: async function(req, res){
        const headerAuth  = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
    
        if (userId < 0)
          return res.status(400).json({ 'error': 'wrong token' });
    
        models.User.findOne({
          attributes: [ 'id', 'email', 'username', 'bio' ],
          where: { id: userId }
        }).then(function(user) {
          if (user) {
            res.status(201).json(user);
          } else {
            res.status(404).json({ 'error': 'Aucun utilisateur trouvé' });
          }
        }).catch(function(err) {
          res.status(500).json({ 'error': 'Aucun utilisateur trouvé' });
        });
      },

      /***************************************************************************** UPDATE PROFIL *********************************************************************/


         updateUserProfile: async function (req, res){
       
        /* 
               const id = req.params.id;
        models.User.update(updateBio, {where: {id: id, userId: userId}}).then(result => {
            res.status(200).json(updateBio);
        }).catch(  error => res.status(400).json({ error }));
       } */


       const HeaderAuth =  req.headers['authorization'];
       const userId =  jwtUtils.getUserId(HeaderAuth);

       if (userId < 0)
           return res.status(400).json({ 'error': 'invalide Token' })

       await models.User.findOne({
           where: { id: userId },
       }).then(async function (user) {
               if (user) {
                   let user = await models.User.findOne({ where: { id: userId } });
                   if (req.body.bio) {
                       user.bio = req.body.bio
                   }
                   if (req.body.username) {
                       user.username = req.body.username
                   }
                   const newUser = await user.save({ fields: ["username", "bio"] }); 
                   return res.status(200).json({
                       user: newUser,
                       messageRetour: "Modification enregistrée",
                   });
               }else{
                   res.status(404).json({ 'error': 'error' }); 
               }
           }).catch(function (err) {
               return res.status(500).json({ 'error': err });
           })

  },

      /***************************************************************************** DELETE ONE USER *********************************************************************/

  deleteUser: async function (req, res) {

    const HeaderAuth = await req.headers['authorization'];
    const userId = await jwtUtils.getUserId(HeaderAuth);
    const isAdmin = await jwtUtils.getUserAdmin(HeaderAuth);

    if (userId < 0)

        return res.status(400).json({ 'error': 'invalide Token' })

    await models.User.findOne({ where: { id: userId }})
        .then(async function (user) {

            if (userId === user.id || isAdmin === true ) {

                await models.User.destroy({

                    where: {id: userId}

                }).then(() => res.send("Compte supprimé"));

            } else {
                res.status(404).json({ 'error': 'error' });
            }
        }).catch(function (err) {
            return res.status(500).json({ 'error': err });
        })
},

}