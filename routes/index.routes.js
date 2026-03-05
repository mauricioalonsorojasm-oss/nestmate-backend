const router = require('express').Router()



const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const listingsRoutes = require("./listings.routes")
router.use("/", listingsRoutes)

const favoritesRoutes = require("./favorites.routes")
router.use("/", favoritesRoutes)

/*const userRoutes = require("./user.routes")
router.use("/", userRoutes)*/

const conversationRoutes = require("./conversation.routes")
router.use("/", conversationRoutes)

const messageRoutes = require("./messages.routes")
router.use("/", messageRoutes)
module.exports = router