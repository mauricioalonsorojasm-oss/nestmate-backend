const router = require('express').Router()



const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const listingsRoutes = require("./listings.routes")
router.use("/", listingsRoutes)

module.exports = router