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


export const getPosts = (page) => API.get(`/posts?page=${page}`);
export const searchPosts = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery?.searchQuery || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const addLike = (id) => API.patch(`/posts/like/${id}`);
export const getUserPosts = (id) => API.get(`/posts/user/${id}`);

export const signIn = (user) => API.post('/users/signIn', user);
export const signUp = (user) => API.post('/users/signUp', user);
export const getUser = (id) => API.get(`/users/${id}`);
