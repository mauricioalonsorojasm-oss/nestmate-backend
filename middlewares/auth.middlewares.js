const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {

  try {
    
    const token = req.headers.authorization.split(" ")[1]

    const payload = jwt.verify(token, process.env.TOKEN_SECRET)

   
    req.payload = payload

    next() // continue with the route
  } catch (error) {
  
    res.status(401).json({errorMessage: "There is no token. Or token is invalid or expired."})
  }

}

module.exports = verifyToken