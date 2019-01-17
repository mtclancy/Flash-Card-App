const express = require("express");

const User = require('../models/user');
const Deck = require('../models/deck');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
    const deck = new Deck({
        title: req.body.title,
        content: req.body.content,
        likes: req.body.likes,
        creator: req.userData.userId
    });
    deck.save().then(createdDeck => {
        res.status(201).json({
            message: 'Deck added successfully',
            deckId: createdDeck._id
        });
    });
});

router.get("", (req, res, next) => {
    Deck.find()
     .then(documents => {
         res.status(200).json({
             message: 'Decks fetched successfully',
             decks: documents
         }); 
    });
 });

module.exports = router;