const express = require("express");

const User = require('../models/user');
const Post = require('../models/post');
const Fact = require('../models/fact');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
    const fact = new Fact ({
        post: req.body.post,
        content: req.body.content,
        likes: req.body.likes,
        creator: req.userData.userId
    })
    fact.save().then(createdFact => {
        res.status(201).json({
            message: 'Fact added successfully',
            factId: createdFact._id
        });
    });
});

router.get("/:id", checkAuth, (req, res, next) => {
    Fact.find({ post: req.params.id })
    .then(documents => {
        res.status(200).json({
            message: 'Facts fetched successfully',
            facts: documents
        }); 
   });
})

module.exports = router;