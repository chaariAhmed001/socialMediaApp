import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name :  {type : String ,required:true}, 
    email:  {type : String ,required:true},
    password: {type : String },
    imageUrl: String,
});
const UserModel = mongoose.model('Users',userSchema);
export default UserModel;