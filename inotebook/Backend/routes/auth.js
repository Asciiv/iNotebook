const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//import { Router } from 'express';
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
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
        return res
          .status(400)
          .json({ error: "Sorry a user with this mail already exists" });
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
      res.status(500).send("Some error occured");
    }
  }
);

module.exports = router;
