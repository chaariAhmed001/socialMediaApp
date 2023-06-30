const initailState = {
    posts : [],
    post:null,
    isLoading: true,
    isOpenModal: false,
    userProfile: null,
    userPosts: [],
    selectedPost: null,
    searchModal: false,
}
const postsReducer = (state=initailState, action) => {
    switch (action.type) {
        case 'GETALLPOSTS':
            return {...state, posts:action.payload?.data, currentPage: action.payload?.currentPage, numberOfPages: action.payload?.numberOfPages};
        case'GET_POSTS_BY_SEARCH': 
          return {...state, posts:action.payload?.data}
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
            posts: state.posts.filter((post) => post._id !== action.payload),
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
          case 'START_LOADING':
            return { ...state, isLoading: true };
          case 'END_LOADING':
            return { ...state, isLoading: false };
          case 'SET_OPEN_MODAL': 
            return {...state, isOpenModal: true};
          case 'SET_CLOSE_MODAL': 
            return {...state, isOpenModal: false};
          case 'SET_USER_PROFILE':
            return { ...state, userProfile: action.payload };
          case 'GET_USER_POSTS':
            return {...state,userPosts: action.payload};
          case 'SET_SELECTED_POST':
            return {...state,selectedPost: action.payload};
          case 'ADD_COMMENT':
            return {...state,posts: state.posts.map((post)=>{
            // Update the post with the comment
            if(post._id === action?.payload?.postId){
                return action.payload;
              }
              return post;
            })};
          case 'SET_SEARCH_MODAL': 
            return { ...state, searchModal: !state.searchModal };
          default:
            return state;
    }

}

export default postsReducer