const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    deck: { type: mongoose.Schema.Types.ObjectId, ref: "Deck", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model('Post', postSchema);