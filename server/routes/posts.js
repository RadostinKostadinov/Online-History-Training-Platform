const express = require("express");
const router = express.Router();
const Post = require("../models/Post");


//Връща всички постове
router.get("/", async (req, res) => {
    try{
        const posts = await Post.find({});
        res.json(posts);
    }catch(err) {
        res.status(500).json({message:err});
    }
});

//Създава пост
router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });

    try {
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

//Връща пост с дадено ID
router.get('/:postId', async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err) {
        res.status(500).json(err)
    }
});

//Изтрива пост с дадено ID
router.delete('/:postId', async (req, res) => {
    try{
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.status(200).json(removedPost);
    } catch(err) {
        res.status(500).json({message: 'FAIL: posts.js / router.delete( /:postId ) ', err});
    }
});

//Обновява информацията в пост с дадено ID
router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne({ _id: req.params.postId }, { $set: req.body });
        res.status(200).json(updatedPost)
    } catch(err) {
        res.status(500).json(err);
    }
});
module.exports = router;
