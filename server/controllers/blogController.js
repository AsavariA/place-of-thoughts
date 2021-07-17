import BlogModel from "../models/blogModel.js";
import mongoose from 'mongoose';

export const getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await BlogModel.find();
        res.status(200).json(allBlogs)
    } catch (error) {
       res.status(404).json({message: error.message}) 
    }
}

export const createBlog = async (req, res) => {
    const blog = req.body
    const newBlog = new BlogModel({...blog, ownerId: req.userId})
    try {
        await newBlog.save();
        res.status(201).json(newBlog);
        console.log('Blog Created!');
    } catch (error) {
        res.status(409).json({message: error.message})
        console.log(error); 
    }
}

export const updateBlog = async (req, res) => {
    const { id: _id } = req.params;
    const blog = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id found');

    const updatedBlog = await BlogModel.findByIdAndUpdate(_id, blog, {new: true});

    res.json(updatedBlog);
}
