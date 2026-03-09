const router = require("express").Router();
const Message = require("../models/Message.model");
const verifyToken = require("../middlewares/auth.middlewares")
const Conversation = require("../models/Conversation.model");

//GET all messages of a conversation

router.get("/conversations/:id", verifyToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;

    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const isParticipant = conversation.participants.some(
      (participantId) => participantId.toString() === userId.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({ message: "Access denied" });
    }

    const messages = await Message.find({ conversation: req.params.id })
      .populate("sender", "name photoUrl")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});



// POST - create message


router.post("/conversations/:id", verifyToken, async (req, res, next) => {
  try {
    const senderId = req.payload._id;
    const { text } = req.body;

    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const isParticipant = conversation.participants.some(
      (participantId) => participantId.toString() === senderId.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({ message: "Access denied" });
    }

    const receiverId = conversation.participants.find(
      (participantId) => participantId.toString() !== senderId.toString()
    );

    const newMessage = await Message.create({
      conversation: req.params.id,
      sender: senderId,
      receiver: receiverId,
      text,
    });

    const populatedMessage = await Message.findById(newMessage._id).populate(
      "sender",
      "name photoUrl"
    );

    res.status(201).json(populatedMessage);
  } catch (error) {
    next(error);
  }
});
  

module.exports = router;