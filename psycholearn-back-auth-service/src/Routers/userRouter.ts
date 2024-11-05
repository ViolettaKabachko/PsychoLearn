import Router, {Response, Request} from 'express';
import userController from '../Controllers/userController';

export const userRouter = Router();

userRouter.get("/", userController.getUsers)

userRouter.post("/", userController.postUser)

userRouter.get("/:id", userController.getUserById)

