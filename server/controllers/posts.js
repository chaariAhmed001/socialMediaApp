import mongoose from "mongoose";
import PostModel from "../models/postModel.js";

export const getPosts = async (req,res)=>{
    const {page}= req.query;
    try {
        const limit  = 6; //limit post in one page 
        const startIndex = (Number(page) -1 )*limit;//get the start index in evrey query 
        const total = await PostModel.countDocuments({}); //get the total number of documents 
        const posts = await PostModel.find().sort({_id: -1 }).limit(limit).skip(startIndex);

        res.status(200).json({data: posts , currentPage: Number(page), numberOfPages: Math.ceil(total/limit)});
    } catch (error) {
        res.status(404).json({ message: error });
    }
};
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    console.log({ searchQuery, tags });
    try {
      const title = new RegExp(searchQuery, 'i');
      const posts = await PostModel.find({ $or: [{ title: title }, { tags: { $in: tags.split(',') } }] });
      res.json({ data: posts });
    } catch (error) {
      res.json({ message: error.message });
    }
  };
  
export const createPost = async (req,res)=>{
    const postRq = req.body;
    const newPost = PostModel({...postRq, creator: req.userId, createdAt: new Date().toISOString()});
    try {
     await newPost.save();
     res.status(201).json({post: newPost})
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