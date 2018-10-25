const express = require("express");

const Post = require('../models/post');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        likes: req.body.likes,
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
    });
});

router.get("",(req, res, next) => {
   Post.find()
    .then(documents => {
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: documents
        }); 
   });
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(200).json({ message: 'Post not found!'});
        }
    })
});

router.put("/:id", checkAuth, (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        likes: req.body.likes
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {
        res.status(200).json({ message: "update successful" });
    });
})

router.delete("/:id", checkAuth, (req, res, next) => {
    Post.deleteOne({ _id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "post deleted"});
    });
});

module.exports = router;