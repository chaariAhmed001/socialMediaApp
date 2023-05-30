const initialState = {
  userProfile: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.setItem('userProfile', JSON.stringify(action.data));
      return { ...state, userProfile: action.data };
    case 'LOGOUT':
      localStorage.clear();
      return { ...state, userProfile: null };
    default:
      return state;
  }
};

export default loginReducer;
