const router = require('express').Router()



const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const listingsRoutes = require("./listings.routes")
router.use("/", listingsRoutes)

const favoritesRoutes = require("./favorites.routes")
router.use("/", favoritesRoutes)

module.exports = router