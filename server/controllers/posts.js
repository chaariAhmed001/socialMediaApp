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
    const newPost = PostModel({...postRq, creator: req.userId, createdAt: new Date().toISOString()});
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
    
    // test if thee user is authenticated
    if(!req.userId) return res.json({message: "User unauthenticated"}); 
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Post not found`);
     
    try {
        const post = await PostModel.findById(id);
        if (!post) return res.status(404).send('Post not found');
        //cheeck if the user is liked the post 
        const index  = post.likes.findIndex((id)=> id === String(req.userId));
        if(index === -1 ){
            //like the post
            post.likes.push(req.userId);
        }else{
            //dislike the post
           post.likes=  post.likes.filter((id)=> id !== String(req.userId))
        }
        const updatedPost = await PostModel.findByIdAndUpdate(id,post,{new:true});
        res.json(updatedPost);
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
  
}