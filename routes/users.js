const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const bodyParser = require('body-parser');

//bodyparser
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

//User model
const User = require('../models/Users');

router.get('/login' , (req,res)=>{ 
    res.render('login')
});

router.get('/register' , (req,res)=>{ 
    res.render('register')
});

//register
router.post('/register' , (req,res) => {
    //console.log(req.body);
    const { name, email, password, password2 } = req.body;
    //console.log({ name, email, password, password2 });
    let errors =[];

    //to check if all field are filled
    if(!name || !email || !password){
        errors.push({msg:'Please fill in all the details'})
    }

    //to check the length of password
    if(password.length<6){
        errors.push({msg:'The length of password must be 6 or more'})
    }

    //to match the password
    if(password != password2){
        errors.push({msg:'The passwords do not match '})
    }

    //to display errors
    if(errors.length>0){
        res.render('register', {
            errors,
            name,
            email,
            password
        });
    }
    else{
        //Validation passed
        User.findOne({email : email}).then(user => {
            if(user){
                //user exists
                errors.push({msg : 'The Email already exists'});
            res.render('register', {
                errors,
                name,
                email,
                password
            });
        }
        else{
            const newUser = new User({
                name,
                email,
                password
            });
            bycrypt.genSalt(10, (err,salt) =>
            bycrypt.hash(newUser.password , salt ,(err,hash) =>{
                if(err) throw err;
                //save password
                newUser.password = hash;
                //save user
                newUser.save()
                .then(user => {
                    req.flash('success_msg', 'You are registered now! You can login.');
                    res.redirect('/users/login')
                })
                .catch(err => console.log(err))
            }))
        }
        });
    }
    
})

module.exports = router;