import  express  from "express";
import { getPosts,createPost,updatePost, deletePost, addLike} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();


router.get('/',getPosts);
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/like/:id',auth,addLike)
export default router;