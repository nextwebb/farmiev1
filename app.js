const express = require('express');
const app = express();

const router = require('./router');//it expects a file router.js

//boiler plate code
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//we use the express feature to serve static files as images,css files and js files.
app.use(express.static('public')); 
app.use(express.static('public/img/bg-img')); 
app.use(express.static('public/img/core-img')); 
app.use(express.static('public/css')); 
app.use(express.static('public/scss')); 
app.use(express.static('public/mixins')); 
app.use(express.static('public/utilities')); 
app.use(express.static('public/fonts')); 
app.use(express.static('public/js')); 

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', router); 


app.listen(3000);