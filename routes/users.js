const express = require('express');
const router = express.Router();

router.get('/login' , (req,res)=>{ 
    res.render('login')
});

router.get('/register' , (req,res)=>{ 
    res.render('register')
});

router.post('/register' , (req,res) => {
    const { name, email, password} = req.body;
    let errors =[];

    //to check if all field are filled
    if(!name || !email || !password){
        errors.push({msg:'Please fill in all the details'})
    }

    //to check the length of password
    if(password.length<6){
        errors.push({msg:'The length of password must be 6 or more'})
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
        res.send('pass')
    }
    
})

module.exports = router;