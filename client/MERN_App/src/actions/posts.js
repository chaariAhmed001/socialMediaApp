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