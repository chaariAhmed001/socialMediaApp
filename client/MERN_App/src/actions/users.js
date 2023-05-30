import * as api from '../api/index';

export const userSignIn = (user,navigate) => async (dispatch) =>{
    try {
        const {data} = await api.signIn(user);
        dispatch({type: "AUTH" , data: data});
        navigate('/');
    } catch (error) {
         console.log(error?.message);
    }
}
export const userSignUp = (user,navigate) => async (dispatch) =>{
    try {
        const {data} = await api.signUp(user);
        console.log(data)
        dispatch({type: "AUTH" , data: data});
        navigate('/')
    } catch (error) {
        navigate('/')
        console.log(error);
    }
}