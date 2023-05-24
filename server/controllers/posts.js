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
    const newPost = PostModel(postRq);
    try {
     await newPost.save();
     res.status(201).json({message: "post creat successfully"})
    } catch (error) {
     res.status(409).json({message: error.message})
    }
};


export const updatePost = async (req,res)=>{
    const {id:_id} = req.params;
    const updatedPost = req.body;
    //cheek id if it'is a mongosse object id:
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`Post not found`);
    const post = await PostModel.findByIdAndUpdate(_id,updatedPost,{ new: true})
    res.json(post)
}

export const deletePost = async (req,res) =>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Post not found`);
    await PostModel.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
}   

export const addLike = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Post not found`);
     
    try {
        const post = await PostModel.findById(id);
        if (!post) return res.status(404).send('Post not found');
        post.likeCount ++;
        await post.save();
        res.json({ message: "Post liked successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  
}