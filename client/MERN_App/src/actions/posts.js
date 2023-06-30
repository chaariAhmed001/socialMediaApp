import * as api from "../api/index"

export const getPosts =(page)=> async (dispatch)=>{
    try {
        dispatch({type:'START_LOADING'})
        const { data } = await api.getPosts(page ||1);
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
        dispatch({type:'START_LOADING'});
        const {data} = await api.createPost({...post});
        dispatch({ type: 'CREATPOST',payload: post});
        dispatch({type:'END_LOADING'});

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
    } catch (error) {
        console.log(error)
    }
}

export const getUserPosts = (userEmail)=> async (dispatch)=>{
    try {
        const userPosts =await api.getUserPosts(userEmail);
        dispatch({type:'START_LOADING'})
        dispatch({type:'GET_USER_POSTS' ,payload:userPosts.data.userPosts});
        dispatch({type:'END_LOADING'})

    } catch (error) {
        console.log(error)
    }
}

export const postComment =(comment,postId)=> async (dispatch)=>{
    try {
     const {data}=await api.comment(comment,postId);
     dispatch({type:"ADD_COMMENT",payload:data});
     return data?.comments
    } catch (error) {
        console.log(error)
        
    }
}