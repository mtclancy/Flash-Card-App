const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();
const FactController = require('../controllers/facts');

router.post("", checkAuth, FactController.createFact);

router.get("/:id", checkAuth, FactController.getFacts);

router.put("/likes/:id", checkAuth, FactController.likeFact);

module.exports = router;