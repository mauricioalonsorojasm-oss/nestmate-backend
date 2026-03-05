const {Schema, model} = require('mongoose');

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true, lowercase: true, trim: true },
	password: { type: String, required: true },
	city: { type: String },
	age: { type: Number },
	cleanliness: { type: Number },
	noiseLevel: { type: Number },
	smoker: { type: Boolean },
	pets: { type: Boolean },
	description: { type: String },
	photoUrl: { type: String },
	favorites: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
});

const User = model("User", userSchema);

module.exports = User;