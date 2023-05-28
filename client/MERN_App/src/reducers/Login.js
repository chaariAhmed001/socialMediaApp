const initialState = {
    userProfile: null,
    userToken : JSON.parse(localStorage.getItem('userProfile')),
}

const loginReducer = (state=initialState,action)=>{
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('userProfile', JSON.stringify(action?.data));
            return {...state, profilData : action?.data }
        case 'LOGOUT':
            localStorage.clear();
            return {...state, profilData : null }
        default:
            return state;
    }
}
export default loginReducer;