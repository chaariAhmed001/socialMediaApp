import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt :
    {
        type: Date,
        default: new Date(),
    },
    comments:{
        type: [{name: String, comment: String}],
        default: [],
    }
});
const PostModel = mongoose.model('Posts', postSchema);
export default PostModel;