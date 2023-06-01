import * as api from "../api/index"

export const getPosts =(page)=> async (dispatch)=>{
    try {
        dispatch({type:'START_LOADING'})
        const { data } = await api.getPosts(page);
        dispatch({ type:"GETALLPOSTS", payload: data });
        dispatch({type:'END_LOADING'})
       
    } catch (error) {
        console.log(error)
    }
}
const updatePostList = (posts) => ({ type: "UPDATE_POST_LIST", payload: posts });

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
      dispatch({type:'START_LOADING'})
      const { data } = await api.searchPosts(searchQuery);
      dispatch({type: 'GET_POSTS_BY_SEARCH', payload:data});
      dispatch({type:'END_LOADING'})
    } catch (error) {
      console.log(error);
    }
  };
  

export const creatPost = (post)=> async (dispatch) =>{
    try {
        const {data} = await api.createPost({...post});
        
        dispatch({ type: 'CREATPOST',payload: post});
       
    } catch (error) {
        console.log(error);
    }
}
export const updatePost = (id,post) => async(dispatch)=>{
    try {
        const {data} = await api.updatePost(id,post);
        dispatch({type:'UPDATEPOST',payload: data})
        //dispatch(updatePostList([data]));

    } catch (error) {
        console.log(error)
    }
}

export const setCurrentPost = (postID) => async(dispatch)=>{
    dispatch({type:'GET_SElECTED_POST',payload:postID})
} 

export const deltePost = (postID) => async(dispatch) =>{
    try {
        await api.deletePost(postID);
        dispatch({type:'DELETEPOST',payload:postID});
     
    } catch (error) {
        console.log(error);
    }
}

export const addLike = (postID) => async(dispatch) =>{
    try {
        await api.addLike(postID);
        dispatch({type:'ADDLIKE' ,payload:postID});
        // const { data } = await api.getPosts();
        // dispatch(updatePostList(data));
    } catch (error) {
        console.log(error)
    }
}

