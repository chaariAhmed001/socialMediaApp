import  express  from "express";
import { signIn, signup } from "../controllers/user.js";

const userRoutes = express.Router();
userRoutes.post('/signIn',signIn)
userRoutes.post('/signUp',signup)


export default  userRoutes;