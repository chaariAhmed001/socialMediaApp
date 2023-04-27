import * as api from "../api/index"

export const getPosts =()=> async (dispatche)=>{
    try {
        const { data } = await api.getPosts();
        dispatche({ type:"GETALLPOSTS", payload: data })
    } catch (error) {
        console.log(error.message)
    }
}


export const creatPost = (post)=> async (dispatch) =>{
    try {
        const {data} = await api.creatPost(post);
        dispatch({ type: 'CREATPOST',payload: data})
    } catch (error) {
        console.log(error.message);
    }
}
export const updatePost = (id,post) => async(dispatch)=>{
    try {
        const {data} = await api.updatePost(id,post);
        dispatch({type:'UPDATEPOST',payload: data})
    } catch (error) {
        console.log(error.message)
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
        console.log(error.message);
    }
}