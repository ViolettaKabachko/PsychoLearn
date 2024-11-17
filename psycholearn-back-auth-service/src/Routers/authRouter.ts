import Router from 'express';
import authController from '../Controllers/authController';

export const authRouter = Router();

authRouter.post("/login", authController.login)