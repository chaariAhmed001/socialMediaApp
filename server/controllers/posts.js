import mongoose from "mongoose";
import PostModel from "../models/postModel.js";

export const getPosts = async (req,res)=>{
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const createPost = async (req,res)=>{
    const postRq = req.body;
    const newPost = PostModel(postRq)
    try {
     await newPost.save();
     res.status(201).json({message: "post creat successfully"})
    } catch (error) {
     res.status(409).json({message: error.message})
    }
};


export const updatePost = async (req,res)=>{
    const {id:_id} = req.param;
    const updatedPost = req.body;
    //cheek id if it'is a mongosse object id:
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('post note found!');

    const post = await PostModel.findByIdAndDelete(_id,updatePost,{ new: true})
    res.json(post)

}