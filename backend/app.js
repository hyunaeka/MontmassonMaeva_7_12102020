//imports 

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require("helmet");


const usersRoutes = require('./routes/usersRoute')
const postsRoutes = require('./routes/postRoute')
const commentsRoutes =require('./routes/commentsRoute');



// Lancer le serveur

const app = express();
app.use(cors());
app.use(helmet());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Config du body parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/users", usersRoutes);

app.use("/api/posts", postsRoutes);

app.use("/api/comments", commentsRoutes);

module.exports = app;

