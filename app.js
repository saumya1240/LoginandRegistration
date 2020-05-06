const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');

var app = express();

//db 
const db = require('./config/keys').configKey;

//connect to database
mongoose.connect(db,  {useNewUrlParser: true , useUnifiedTopology: true});

//ejs
app.use(expressLayout);
app.set('view engine', 'ejs');

//bodyparser
app.use(express.urlencoded({extended:false}));

//Routes
app.use('/' , require('./routes/index'));
app.use('/users' , require('./routes/users'));

app.listen(3000);
console.log('Listening to port 3000');