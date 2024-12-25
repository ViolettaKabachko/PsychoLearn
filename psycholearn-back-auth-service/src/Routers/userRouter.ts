import Router from 'express';
import userController from '../Controllers/userController';
import FileMiddleware from '../../FileMiddleware';

export const userRouter = Router();

userRouter.get("/", userController.getUsers)

userRouter.post("/", userController.postUser)

userRouter.get("/:id", userController.getUserById)

userRouter.post("/:id/update_photo", FileMiddleware.diskLoader.single("users_photo"), userController.updateUsersPhoto)

userRouter.get("/:id/photo", userController.getUsersPhoto)

userRouter.post("/:id/change_password", userController.updatePassword)

userRouter.get("/:id/logout", userController.logout)

userRouter.post("/:id/update_data", userController.updateUser)