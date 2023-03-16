
const postsReducer = (posts = [], action) => {
    switch (action.type) {
        case 'GETALLPOSTS':
            return action.payload;
        case 'CREATPOST':
            return [...posts, action.payload];
        default:
            return posts;
    }

}

export default postsReducer