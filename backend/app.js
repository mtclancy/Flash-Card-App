const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://Mike:kVWvIaxni2HqsSea@postscluster-wzcql.mongodb.net/test?retryWrites=true")
.then(() => {
    console.log('Connected to database');
})
.catch(() => {
    console.log('Connection failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, PUT, OPTIONS"
        );
    next();
});

app.post("/api/posts", (req, res, next) => {
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

app.get("/api/posts",(req, res, next) => {
   Post.find()
    .then(documents => {
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: documents
        }); 
   });
});

app.get("/api/posts/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(200).json({ message: 'Post not found!'});
        }
    })
});

app.put("/api/posts/:id", (req, res, next) => {
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

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "post deleted"});
    });
});

module.exports = app;