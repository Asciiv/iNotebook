const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

var fetchuser = require("../middleware/fetchuser");
//import { Router } from 'express';
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const JWT_SECRET = "OneManShow";
// Create a user using: POST "/api/auth/createUser" . No login required

router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are errors , return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether user with this email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this mail already exists" });
      }//create a new user
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
  

      //res.json(user)
      // .then(user => res.json(user))  //--> Promises returning
      // .catch(err => {console.log(err)
      //     res.json({errors: 'Please enter a unique email address',message: err.message})
      // });
      const data = {
        user:{
            id: user.id
        }
      }
      const authtoken =jwt.sign(data,JWT_SECRET);
      //console.log(jwtData);
      res.json({authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error");
    }
  }
);
// authenticate a user login end point
router.post(
  "/login",
  [
    
    body("email", "Enter a valid email").isEmail(),
    body("password","Password cannot be blank").exists(),
   
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
     const {email, password} = req.body;
      try{
        let user = await User.findOne({email});
        if(!user){
          return res.status(400).json({error:"Please try to login with correct credentials"});

        }
        const passwordComapare = await bcrypt.compare(password,user.password);
        if(!passwordComapare){
          return res.status(400).json({error:"Please try to login with correct credentials"});
          
        }
        
      const data = {
        user:{
            id: user.id
        }
      }
      const authtoken =jwt.sign(data,JWT_SECRET);
      res.json({authtoken})
      }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
      }
  });
  //Router 3 for middleware
  router.post(
    "/getUser",
    fetchuser,
    async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");    
  }
    })
module.exports = router;
