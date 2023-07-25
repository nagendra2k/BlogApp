const { json } = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');

const allblogs = async (req,res) => {
    const blogs = await Blog.find().populate("postedBy").populate({path: "comments", populate: {path: "postedBy"}});
    res.json(blogs);
}

const myblogs = async (req,res) => {
    const blogs = await Blog.find().populate({path: 'postedBy'}).populate({path: "comments", populate: {path: "postedBy"}});
    const newBlogs = await blogs.filter(item => {
        if(item.postedBy._id.toString() === req.user._id.toString() ){
            return item;
        }
    });
    res.json(newBlogs);
}

const blogdetail = async (req,res) => {    
    const blog = await Blog.findById(req.params.id).populate("postedBy").populate({path: "comments", populate: {path: "postedBy"}});
    res.json(blog);
}

const create = async (req,res) => {
    const {title,description,content,imageURL} = req.body;
    if(!title || !content || !imageURL){
        return res.status(422).json({
            error: "please fill all required fields"
        })
    }
    req.user.password = undefined;
    const blog = await Blog.create({
        title: title,
        description: description,
        body: content,
        photo: imageURL,
        postedBy: req.user        
    })
    res.json({
        success: "Blog posted successfully",
        blog
    });
}

const deleteBlog = async (req,res) => {

    try {
        const blogs = await Blog.find().populate("postedBy").populate({path: "comments", populate: {path: "postedBy"}});
        blogs.forEach((blog) => {
            if(blog._id.toString() === req.params.id.toString()){
                if(blog.postedBy._id.toString() === req.user._id.toString()){
                    blog.remove();
                    res.json({success: "Blog deleted successfully", id: blog._id});
                }
            }
        }) 
        res.json({error: "Error in deleting blog"});
    } catch (error) {
        console.log(error);
    }
        
      
}

const comment = async (req,res) => {
    const newComment = {
        text: req.body.text,
        postedBy: req.user
    }
    try {
        let blog = await Blog.findById(req.body.BlogId).populate("postedBy").populate({path: "comments", populate: {path: "postedBy"}});
        blog.comments.push(newComment);
        blog.save();
        res.json(blog);
    } catch (error) {
        res.status(422).json({error});
    }   
    
}

const like = async (req,res) => {
    const blog = await Blog.findById(req.body.BlogId).populate("postedBy").populate({path: "comments", populate: {path: "postedBy"}});
    await User.updateOne({
        _id: blog.postedBy._id
    }, {
        $inc: {
            popularity: 1
        }
    });
    blog.likes.push(req.user);
    blog.save();
    res.json(blog);
}

const unlike = async (req,res) => {
    const blog = await Blog.findById(req.body.BlogId).populate("postedBy").populate({path: "comments", populate: {path: "postedBy"}});
    await User.updateOne({
        _id: blog.postedBy._id
    }, {
        $inc: {
            popularity: -1
        }
    });
    blog.likes.pull(req.user);
    blog.save();
    res.json(blog);
}

module.exports = {
    create,
    allblogs,
    myblogs,
    like,
    unlike,
    blogdetail,
    comment,
    deleteBlog
}
