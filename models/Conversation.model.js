const { Schema, model } = require("mongoose");

const conversationSchema = new Schema({
	participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
	listing: { type: Schema.Types.ObjectId, ref: "Listing", required: true },
	
},
 { timestamps: true }
);

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;