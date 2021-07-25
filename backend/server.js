//imports 

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const appRouter = require('./app').router;

// Lancer le serveur

const server = express();
server.use(cors());

// Cette partie configure et autorise les requêtes Multi-Origin; définit les Headers & les Méthodes

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Config du body parser
server.use(express.urlencoded({extended:true}));
server.use(express.json());


server.get ('/', function(req, res, next){
    res.setHeader('Content-Type','text/html');                          
    res.status(200).send('<h1> Vous êtes connecté au serveur </h1>');   
});


server.use('/api/', appRouter);

server.listen(3000, function(){
    console.log('Server Ready');
});