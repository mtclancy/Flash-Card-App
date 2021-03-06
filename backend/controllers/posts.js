const User = require('../models/user');
const Post = require('../models/post');

exports.createPost = (req, res, next) => {
    const post = new Post({
        deck: req.body.deck,
        title: req.body.title,
        content: req.body.content,
        likes: req.body.likes,
        creator: req.userData.userId
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
    });
}

exports.getAllPosts = (req, res, next) => {
    Post.find()
     .then(documents => {
         res.status(200).json({
             message: 'Posts fetched successfully',
             posts: documents
         }); 
    });
 }

exports.getDeckPosts = (req, res, next) => {
    Post.find({ deck: req.params.id })
    .then(documents => {
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: documents
        }); 
   });
}

exports.getPost = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(200).json({ message: 'Post not found!'});
        }
    })
}

exports.updatePost = (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        likes: req.body.likes,
        creator: req.body.userId
    });
    Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
        if(result.n > 0) {
            res.status(200).json({ message: "Update successful" });
        } else {
            res.status(401).json({ message: "Not authorized"});
        }
        
    });
}

exports.deletePost = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId}).then(result => {
        if(result.n> 0) {
            res.status(200).json({ message: "Deletion successful" });
        } else {
            res.status(401).json({ message: "Not authorized"});
        }
    });
}

exports.likePost = (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        likes: req.body.likes,
        creator: req.body.creator
    });
    User.findOne({email: req.userData.email}).then(user => {
        if(user) {
            const likedPosts = user.likedPosts;
            const match = likedPosts.filter(a => a == req.body.id);
            if(match.length > 0) {
                return res.status(401).json({ message: "Post already liked!"});
            } else {
                Post.updateOne({_id: req.params.id}, post)
                .then(result => {
                   return res.status(200).json({ message: "Update successful" });
              }).then(() => {
               return User.updateOne({email: req.userData.email}, {$push: {likedPosts: post._id}})
              });
            }
        } else {
            return res.status(401).json({ message: "Not Authorized"});
        }
    })
}