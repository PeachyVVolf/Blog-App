const router =require('express').Router();
const Category = require('../models/Category');

// NEW CATEGORY
router.post("/", async(req,res,next)=>{
    const newCat = new Category(req.body);
    try {
        const sendCategory = await newCat.save();
        res.status(200).json(sendCategory);
    } catch (err) {
        res.status(500).json(err);
    }
})

// GET CATEGORIES
router.get("/", async(req,res,next)=>{
    const cats = await Category.find();
    try {
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router