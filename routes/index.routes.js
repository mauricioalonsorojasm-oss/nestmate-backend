const router = require("express").Router();

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

const listingsRoutes = require("./listings.routes");
router.use("/listings", listingsRoutes);

const favoritesRoutes = require("./favorites.routes");
router.use("/favorites", favoritesRoutes);

const conversationRoutes = require("./conversation.routes");
router.use("/conversations", conversationRoutes);

const messageRoutes = require("./messages.routes");
router.use("/messages", messageRoutes);

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);




module.exports = router;