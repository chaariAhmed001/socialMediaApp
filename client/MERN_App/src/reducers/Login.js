const initialState = {
  userProfile: null,
  creator: null,
  user: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.clear();
      localStorage.setItem('userProfile', JSON.stringify(action.data));
      return { ...state, userProfile: action.data };
    case 'LOGOUT':
      localStorage.clear();
      return { ...state, userProfile: null };
    case 'GET_USER_BY_ID':
      return { ...state, creator: action.data };
    case 'GET_USER_BY_EMAIL':
        return { ...state, user: action.payload?.data };
    default:
      return state;
  }
};

export default loginReducer;
