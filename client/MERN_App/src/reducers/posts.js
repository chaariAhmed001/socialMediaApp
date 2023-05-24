const initailState = {
    posts : [],
    post:null,
}


const postsReducer = (state=initailState, action) => {
    switch (action.type) {
        case 'GETALLPOSTS':
            return {...state, posts:action.payload};
        case 'CREATPOST':
            return { ...state, posts: [...state.posts, action.payload] };
        case 'UPDATEPOST':
          return {
            ...state,
            posts: state.posts.map((post) =>
              post._id === action.payload._id ? action.payload : post
              )
            };
        case 'DELETEPOST': 
          return {
            ...state,
            posts: state.posts.filter((post) => post._id !== action.payload._id),
          };            
        case 'GET_SElECTED_POST': 
          return {...state, post: action.payload};
        case "UPDATE_POST_LIST":
          return {
            ...state,
            posts: action.payload,
          };
          case 'ADDLIKE':
            return {
              ...state,
              posts: state.posts.map((post) =>
                post._id === action.payload._id ? action.payload : post
                )
              };
        default:
            return state;
    }

}

export default postsReducer