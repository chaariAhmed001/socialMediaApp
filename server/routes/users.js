import  express  from "express";
import { getUserById, signIn, signup } from "../controllers/user.js";

const userRoutes = express.Router();
userRoutes.post('/signIn',signIn)
userRoutes.post('/signUp',signup)
userRoutes.get('/:id',getUserById)

export default  userRoutes;