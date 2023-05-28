import axios from "axios"
const url = 'http://localhost:5000/posts';

export const getPosts =()=>axios.get(url);
export const creatPost =(newPost)=>axios.post(url,newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const addLike = (id)=> axios.patch(`${url}/like/${id}`);

const loginUrl = 'http://localhost:5000/users'
export const signIn =(user)=>axios.post(`${loginUrl}/signIn`,user);
export const signUp =(user)=>axios.post(`${loginUrl}/signUp`,user);
