const { Schema, model } = require("mongoose");

const listingSchema = new Schema({
  title: { type: String, required: true },

  city: { type: String, required: true },

  price: { type: Number, required: true },

  description: { type: String },

  cleanliness: { type: Number },

  noiseLevel: { type: Number },

  smokerAllowed: { type: Boolean },

  petsAllowed: { type: Boolean },

  photoUrl: {
    type: String,
    default: ""
  },

  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },

});

const Listing = model("Listing", listingSchema);

module.exports = Listing;