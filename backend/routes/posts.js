const express = require("express");
const checkAuth = require("../middleware/check-auth");
const PostController = require('../controllers/posts');

const router = express.Router();

router.post("", checkAuth, PostController.createPost);

router.get("", PostController.getAllPosts);

router.get("/:id", checkAuth, PostController.getDeckPosts);

router.get("/post/:id", checkAuth, PostController.getPost);

router.put("/:id", checkAuth, PostController.updatePost);

router.delete("/:id", checkAuth, PostController.deletePost );

router.put("/likes/:id", checkAuth, PostController.likePost);

module.exports = router;

