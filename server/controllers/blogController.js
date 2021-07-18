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

export const deleteBlog = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id found');

    await BlogModel.findByIdAndRemove(_id); 

    res.json({message: 'Blog Deleted Succesfully'})
}

export const saveBlog = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No blog with id: ${id}`);
    
    const blog = await BlogModel.findById(id);

    const index = blog.saves.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      blog.saves.push(req.userId);
    } else {
      blog.saves = blog.saves.filter((id) => id !== String(req.userId));
    }
    const updatedBlog = await BlogModel.findByIdAndUpdate(id, blog, { new: true });
    res.status(200).json(updatedBlog);
}

export const commentBlog = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const blog = await BlogModel.findById(id);

    blog.comments.push(value);

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, blog, { new: true });
    res.status(200).json(updatedBlog);
}