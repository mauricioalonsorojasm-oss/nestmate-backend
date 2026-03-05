const router = require("express").Router();
const Conversation = require("../models/Conversation.model");
const verifyToken = require("../middlewares/auth.middlewares")
const User = require("../models/User.model");
const Listing = require("../models/Listing.model");

// POST /api/conversations - Creat conversation

router.post("/conversations", verifyToken, async (req, res, next) => {

  try {

    const { listingId, receiverId } = req.body // senderId is the user who is logged in and wants to start a conversation
    const senderId = req.payload._id

    // check if conversation already exists
    let conversation = await Conversation.findOne({
      listing: listingId,
      participants: { $all: [senderId, receiverId] } // check if both sender and receiver are in the participants array
    })

    if (!conversation) { 

      conversation = await Conversation.create({
        listing: listingId,
        participants: [senderId, receiverId]
      })

    }

    res.status(200).json(conversation)

  } catch (error) {
    next(error)
  }

})
// GET - inbox
router.get("/conversations/:id", verifyToken, async (req, res, next) => {
  try {

    const userId = req.payload._id;

    const conversations = await Conversation.find({
      participants: userId
    })
      .populate("participants")
      .populate("listing");

    res.status(200).json(conversations);

  } catch (error) {
    next(error);
  }
});




module.exports = router;