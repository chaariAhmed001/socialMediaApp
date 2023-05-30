import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userProfile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userProfile"))?.data?.token ||
      JSON.parse(localStorage.getItem("userProfile"))?.token
    }`;
  }
  return req;
});

export const getPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const addLike = (id) => API.patch(`/posts/like/${id}`);

export const signIn = (user) => API.post('/users/signIn', user);
export const signUp = (user) => API.post('/users/signUp', user);
