import  express  from "express";
import { getPosts,createPost,updatePost, deletePost, addLike} from "../controllers/posts.js";

const router = express.Router();


router.get('/',getPosts);
router.post('/',createPost);
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/like/:id',addLike)
export default router;