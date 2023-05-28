import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
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
    }
});
const PostModel = mongoose.model('Posts', postSchema);
export default PostModel;