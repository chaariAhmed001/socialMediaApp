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
        dispatch({type: "AUTH" , data: data});
        navigate('/')
    } catch (error) {
        navigate('/Login')
        console.log(error);
    }
}

export const getUserById = (id) =>async(dispatch)=>{
    try {
        const {data} = await api.getUser(id);
        dispatch({type:"GET_USER_BY_ID" , data});
    } catch (error) {
     console.log(error);   
    }
}
export const getUserByEmailAction = (email) => async (dispatch) => {
    try {
      const { data } = await api.getUserByEmail(email);
      dispatch({ type: 'GET_USER_BY_EMAIL', payload: data });
    } catch (error) {
      console.log(error);
    }
  };