const router = require('express').Router()



const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const listingsRoutes = require("./listings.routes")
router.use("/listings", listingsRoutes)

const favoritesRoutes = require("./favorites.routes")
router.use("/favorites", favoritesRoutes)

/*const userRoutes = require("./user.routes")
router.use("/", userRoutes)*/

const conversationRoutes = require("./conversation.routes")
router.use("/conversations", conversationRoutes)

const messageRoutes = require("./messages.routes")
router.use("/messages", messageRoutes)
module.exports = router