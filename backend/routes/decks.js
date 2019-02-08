const express = require("express");
const DeckController = require('../controllers/decks');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, DeckController.createDeck);

router.get("", DeckController.getDecks);

router.get("/:id", checkAuth, DeckController.getDeck);

router.delete("/:id", checkAuth, DeckController.deleteDeck);

module.exports = router;