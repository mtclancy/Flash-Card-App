const mongoose = require('mongoose');

const factSetSchema = mongoose.Schema({
    content: { type: String, required: true },
    factLikes: { type: Number, required: true },
    forPost: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }
});

module.exports = mongoose.model('FactSet', postSchema);