const Fact = require('../models/fact');
const User = require('../models/user');

exports.createFact = (req, res, next) => {
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
}

exports.getFacts = (req, res, next) => {
    Fact.find({ post: req.params.id })
    .then(documents => {
        res.status(200).json({
            message: 'Facts fetched successfully',
            facts: documents
        }); 
   });
}

exports.likeFact = (req, res, next) => {
    const fact = new Fact({
        _id: req.body.id,
        post: req.body.post,
        content: req.body.content,
        likes: req.body.likes,
        creator: req.body.creator
    });
    User.findOne({email: req.userData.email}).then(user => {
        if(user) {
            const likedFacts = user.likedFacts;
            const match = likedFacts.filter(a => a == req.body.id);
            if(match.length > 0) {
                return res.status(401).json({ message: "Fact already liked!"});
            } else {
                Fact.updateOne({_id: req.params.id}, fact)
                .then(result => {
                     return res.status(200).json({ message: "Update successful" });
              }).then(() => {
                    return User.updateOne({email: req.userData.email}, {$push: {likedFacts: fact._id}})
              });
            }
        } else {
            return res.status(401).json({ message: "Not Authorized"});
        }
    })
}