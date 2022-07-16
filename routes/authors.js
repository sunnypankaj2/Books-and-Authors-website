const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const mongoose = require('mongoose');
// All authors route
router.get('/',async (req,res)=>{
    const searchOptions = {}
    if(req.query.name !== null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name,'i')
    }
    try{
        const authors = await Author.find(searchOptions);
        res.render('authors/index',{
            authors: authors,
            searchOptions: req.query
        });
    }catch(error){
        console.log(error)
        res.redirect('/')
    }
});

// New Author Route
router.get('/new',(req,res)=>{
    res.render('authors/new',{ author: new Author()})
});

// create Authors route
router.post('/',async (req,res)=>{
    const author = new Author({
        name:req.body.name
    });
    try{
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor}`);
        res.redirect('authors');
    }catch{
        res.render('authors/new',{
            author: author,
            errorMessage: "Error in creating author"
        });
    }
});

router.get('/delete/:id',async(req,res)=>{
    const _id = mongoose.Types.ObjectId(req.params.id);;
    console.log(_id);
    try{
        const response = Author.findByIdAndDelete(_id);
        console.log(`in try ${response}`);
        res.redirect('/authors');
    }catch(error){
        console.log(`In catch ${error}`);
        res.redirect('/authors');
    }
})
module.exports = router;