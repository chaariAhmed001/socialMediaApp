import  express  from "express";
import { getPosts,createPost,updatePost, deletePost, addLike,getPostsBySearch, getUserPosts} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();


router.get('/',getPosts);
router.get('/search',getPostsBySearch);
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/like/:id',auth,addLike);
router.get('/user/:id', getUserPosts);
export default router;