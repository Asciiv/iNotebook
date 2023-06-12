const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
//import { Router } from 'express';

// Create a user using: POST "/api/auth/" . Doesn't require Auth

router.post('/',[
    body('name','Enter a valid name').isLength({min:5}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be at least 5 characters').isLength({min:5}),

],(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then(user => res.json(user))  //--> Promises returning
    .catch(err => {console.log(err)
        res.json({errors: 'Please enter a unique email address'})
    });``
})

module.exports = router;