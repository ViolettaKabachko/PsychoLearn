import {Response, Request} from 'express';
import { DbClient } from '../Database/DataBaseRunner';
import { User, userGuard } from '../Interfaces/User';
import authController from './authController';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { IJwtPayload } from '../Interfaces/JwtPayload';

dotenv.config();

class UserController {
    async getUsers(req: Request, res: Response) {
        try {
            res.json(await DbClient.getAllUsers());
        }
        catch (e) {
            console.log(e);
        }
    }

    async postUser(req: Request, res: Response) {
        try {
            if (userGuard(req.body))
                res.json(await DbClient.insertUser(req.body as User)).status(200);
            else
                throw Error("Incorrect body format")
        }
        catch (e) {
            console.log(e);
            res.status(401).json({"err": "Incorrect body format"});
        }
    }

    async getUserById (req: Request, res: Response) {
        try {
            console.log(req.cookies)
            //await authController.verifyJWT((req.headers.authorization as string).slice(7), req.cookies["refresh_token"], parseInt(req.params.id))
            const decoded = jwt.decode((req.headers.authorization as string).slice(7)) as IJwtPayload
            let user = await DbClient.getUserById(parseInt(req.params.id))
            res.json({...user, ...res.locals.resBody})
            
        }
        catch (e) {
            res.status(500).json({err: "server error at " + req.path})
        }
    }
// добавить тут в заголовки res.locals.resBody
    async getUsersPhoto(req: Request, res: Response) {
        try {
            // await authController.verifyJWT((req.headers.authorization as string).slice(7), req.cookies["refresh_token"], parseInt(req.params.id))
            let photo = await DbClient.getUsersPhoto(parseInt(req.params.id))
            if (photo.photo !== undefined)
                res.sendFile(photo.photo, {root: "../"})
            else
                res.sendFile("pcts/default.svg", {root: "../"})
        }
        catch (e) {
            console.log(`Error: ${e}`)
            res.status(500).json({err: "Error when get photo"})
        }
    }

    async updateUsersPhoto(req: Request, res: Response) {
        try {
            await authController.verifyJWT((req.headers.authorization as string).slice(7), req.cookies["refresh_token"], parseInt(req.params.id))
            await DbClient.updateUsersPhoto(parseInt(req.params.id), `/pcts/${req.file?.originalname}`)
            res.status(200).json({"msg": "Photo updated", ...res.locals.resBody})
        }
        catch (e) {
            console.log(`Error was occured: ${e}`)
            res.status(401)
        }
    }

    async logout(req: Request, res: Response) {
        try {
            // await authController.verifyJWT((req.headers.authorization as string).slice(7), req.cookies["refresh_token"], parseInt(req.params.id))
            const decoded = jwt.decode((req.headers.authorization as string).slice(7)) as IJwtPayload
            await DbClient.deleteRefreshSession(decoded.uid)
            res.status(200).clearCookie("refresh_token").json({"msg": "Logged out"})
        }
        catch (e) {
            console.log("Error was occured" + e)
            res.status(401).clearCookie("refresh_token").json({"err": "Error when log out"})
        }
    }
}

export default new UserController();