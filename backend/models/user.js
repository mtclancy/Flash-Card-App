const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    likedPosts: { type: Array, _id: true },
    likedFacts: { type: Array, _id: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);