import  express  from "express";
import { getUserById, signIn, signup,getUserByEmail } from "../controllers/user.js";

const userRoutes = express.Router();
userRoutes.post('/signIn',signIn)
userRoutes.post('/signUp',signup)
userRoutes.get('/:id',getUserById)
userRoutes.get('/email/:email', getUserByEmail);

export default  userRoutes;