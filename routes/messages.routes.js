const router = require("express").Router();
const Message = require("../models/Message.model");
const verifyToken = require("../middlewares/auth.middlewares")
const Conversation = require("../models/Conversation.model");
const User = require("../models/User.model");
const Listing = require("../models/Listing.model");
const ConversationRoutes = require("./conversation.routes")



//GET all messages of a conversation

router.get("/conversations/:id/messages", verifyToken, async (req, res, next) => {
  try {

    const messages = await Message.find({ conversation: req.params.id }) // busca los mensjaes que tengan el id de la conversación 
    .populate("sender").sort({ createdAt: 1 }) 
    // en vez de mostrar el id del sender, muestra los datos del usuario que es el sender, y ordena los mensajes por fecha(ascendente)
    res.status(200).json(messages);

  } catch (error) {
    next(error);
  } 
});

// POST - create message


router.post("/conversations/:id/messages", verifyToken, async (req, res, next) => {

  try {

    const newMessage = await Message.create({
      conversation: req.params.id, // el id de la conversación viene en la url
      sender: req.payload._id, // el id del sender viene del token
      receiver: req.body.receiverId, // el id del receiver viene del body
      text: req.body.text // el texto del mensaje viene del body
    })

    res.status(201).json(newMessage)

  } catch (error) {
    next(error)
  }

})
  

module.exports = router;