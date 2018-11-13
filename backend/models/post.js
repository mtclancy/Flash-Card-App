const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    facts: { type: Array }
});

module.exports = mongoose.model('Post', postSchema);