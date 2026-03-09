const router = require("express").Router();
const Conversation = require("../models/Conversation.model");
const verifyToken = require("../middlewares/auth.middlewares");
const User = require("../models/User.model");
const Listing = require("../models/Listing.model");

// POST /api/conversations - Create conversation

router.post("/", verifyToken, async (req, res, next) => {
  try {
    const { listingId, receiverId } = req.body; // data sent in the body to create the conversation
    const senderId = req.payload._id;

    // check if conversation already exists
    let conversation = await Conversation.findOne({
      listing: listingId,
      participants: { $all: [senderId, receiverId] }, // check if both sender and receiver are in the participants array
    });

    if (!conversation) {
      conversation = await Conversation.create({
        listing: listingId,
        participants: [senderId, receiverId],
      });
    }

    res.status(200).json(conversation);
  } catch (error) {
    next(error);
  }
});
// GET - inbox
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;

    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "name photoUrl") // populate the participants' names
      .populate("listing", "title price city photoUrl"); // populate the listing title and price

    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
});

// GET - conversation details by Id

router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;

    const conversation = await Conversation.findById(req.params.id)
      .populate("participants", "name photoUrl")
      .populate("listing", "title price city photoUrl");

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const isParticipant = conversation.participants.some(
      (participantId) => participantId.toString() === userId.toString(),
    );

    if (!isParticipant) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
