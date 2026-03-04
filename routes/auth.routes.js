const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/User.model")
const verifyToken = require("../middlewares/auth.middlewares")


// POST "/api/auth/signup" => Creating a user document => SIGNUP ROUTE
router.post("/signup", async (req, res, next) => {
  console.log(req.body)

  const {email, password, name} = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({errorMessage: "Please provide email, password and name."})
  }

  //password length validation

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({errorMessage: "Password must be at least 6 characters long and contain at least one number, one lowercase letter and one uppercase letter."})
  }

try {
    
    // - does the email already exist?
    const foundUser = await User.findOne( { email: email } )
    if (foundUser) {
      res.status(400).json({ errorMessage: "User already registered with that email" })
      return // now stop the route from continuing.
    }

    const hashPassword = await bcrypt.hash(password, 12)

    
    const response = await User.create({
      email: email,
      password: hashPassword,
      name: name
    })

    res.sendStatus(201)

  } catch (error) {
    next(error)
  }

})

// POST "/api/auth/login" => Check the credentials and return a JWT => LOGIN ROUTE

router.post("/login", async(req, res, next) => {

  const {email, password} = req.body
  
  // validate fields
  if (!email || !password) {
    res.status(400).json({ errorMessage: "All fields are required (email, password)" })
    return // now stop the route from continuing.
  }
  
  try {
    // validate if user doesn't exists
    const foundUser = await User.findOne( { email: email } )
    console.log(foundUser)
    if (!foundUser) {
      res.status(400).json({ errorMessage: "User not registered with that email! Please sign up first." })
      return // now stop the route from continuing.
    }
    
    // validate password
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if (isPasswordCorrect === false) {
      res.status(400).json({ errorMessage: "Password not correct!" })
      return // now stop the route from continuing.
    }
    


    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role
      //* if we are using roles, we should ALWAYS also add the user role here
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d"
    })

    res.status(200).json({ authToken: authToken, payload: payload })

  } catch (error) {
    next(error)
  }
  
})

// GET "/api/auth/verify" => Validates the token on new users accesing the client => VERIFY TOKEN ROUTE
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({payload: req.payload})
})


module.exports = router