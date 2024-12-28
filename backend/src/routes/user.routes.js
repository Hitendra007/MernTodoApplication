import { Router } from "express";
import { verifyJWT ,checkBlacklist} from "../middlewares/auth.middleware.js";
import { login, signup,authStatus,logout } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route('/signup').post(upload.none(),signup);
router.route('/sample').get((req,res)=>{res.send('sample')})
router.route('/login').post(login);
router.route('/logout').get(verifyJWT,checkBlacklist,logout);
router.route('/authStatus').get(verifyJWT,checkBlacklist,authStatus);

export default router;