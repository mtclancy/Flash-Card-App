const mongoose = require('mongoose');

const factSetSchema = mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    facts: { type: Array },
    likes: { type: Number, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('FactSet', factSetSchema);