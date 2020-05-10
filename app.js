const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


var app = express();

require('./config/passport')(passport)

//db 
const db = require('./config/keys').configKey;

//connect to database
mongoose.connect(db,  {useNewUrlParser: true , useUnifiedTopology: true});

//ejs
app.use(expressLayout);
app.set('view engine', 'ejs');

//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

  // Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//Global Variable
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes
app.use('/' , require('./routes/index'));
app.use('/users' , require('./routes/users'));

app.listen(3000);
console.log('Listening to port 3000');