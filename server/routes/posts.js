const router =require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');

// CREATE NEW POST
router.post('/', async (req, res, next) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE POST
router.put('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                    $set: req.body
                },{new:true});
                res.status(200).json("Post Updated.")
            } catch (err) {
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("Post Not Found");
        }
    } catch (err) {
        res.status(500).json(500);
    }
});

// DELETE POST
router.delete('/:id', async(req,res,next)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                await Post.findByIdAndDelete(req.params.id);
                res.status(200).json("Post Deleted.")
            } catch (err) {
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("Post Not Found");
        }
    } catch (err) {
        res.status(500).json(500);
    }
});

// GET POST

module.exports = router;