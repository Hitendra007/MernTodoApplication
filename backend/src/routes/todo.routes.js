import { getTodos ,deleteTodo,updateTodo,toggleComplete,addTodo} from "../controllers/todo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router()

router.use(verifyJWT)

router.route('/getTodos').get(verifyJWT,getTodos);
router.route('/deleteTodo').delete(verifyJWT,deleteTodo)
router.route('/toggleComplete').patch(verifyJWT,toggleComplete)
router.route('/updateTodo').patch(verifyJWT,updateTodo)
router.route('/addTodo').post(verifyJWT,addTodo)


export default router
