const mongoose = require('mongoose');

const deckSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model('Deck', deckSchema);