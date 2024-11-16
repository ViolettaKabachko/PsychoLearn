import {Response, Request} from 'express';
import { DbClient } from '../Database/DataBaseRunner';
import { User, userGuard } from '../Interfaces/User';
import authController from './authController';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { access } from 'fs';
import { IJwtPayload } from '../Interfaces/JwtPayload';

dotenv.config();

class UserController {
    async getUsers(req: Request, res: Response) {
        console.log('\x1b[36m%s\x1b[0m', `[server]: GET request to /users/`)
        try {
            res.json(await DbClient.getAllUsers());
        }
        catch (e) {
            console.log(e);
        }
    }

    async postUser(req: Request, res: Response) {
        console.log('\x1b[36m%s\x1b[0m', "[server]: POST request to /users")
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
        console.log('\x1b[36m%s\x1b[0m', `[server]: GET request to /users/${req.params.id}`)
        try {
            console.log(req.cookies)
            await authController.verifyJWT((req.headers.authorization as string).slice(7), req.cookies["refresh_token"], parseInt(req.params.id))
            const decoded = jwt.decode((req.headers.authorization as string).slice(7)) as IJwtPayload
            let user = await DbClient.getUserById(parseInt(req.params.id))
            if (decoded.uid === user.uid)
                res.json(user)
            else {
                delete user.email, user.uid, user.role
                res.json(user)
            }
        }
        catch (e) {
            res.status(401).json({err: "token exipred"})
        }
    }

    async getUsersPhoto(req: Request, res: Response) {
        console.log('\x1b[36m%s\x1b[0m', `[server]: GET request to /users/${req.params.id}/get_photo`)
        try {
            await authController.verifyJWT((req.headers.authorization as string).slice(7), req.cookies["refresh_token"], parseInt(req.params.id))
            let photo = await DbClient.getUsersPhoto(parseInt(req.params.id))
            if (photo.photo !== undefined)
                res.sendFile(photo.photo, {root: "../"})
            else
                res.sendFile("pcts/default.svg", {root: "../"})
        }
        catch (e) {
            console.log(`Error: ${e}`)
            res.json({err: "Error when get photo"}).status(500)
        }
    }

    async updateUsersPhoto(req: Request, res: Response) {
        console.log('\x1b[36m%s\x1b[0m', `[server]: POST request to /users/${req.params.id}/update_photo`)
        try {
            await authController.verifyJWT((req.headers.authorization as string).slice(7), req.cookies["refresh_token"], parseInt(req.params.id))
            await DbClient.updateUsersPhoto(parseInt(req.params.id), `/pcts/${req.file?.originalname}`)
            res.status(200).json({"msg": "Photo updated"})
        }
        catch (e) {
            console.log(`Error was occured: ${e}`)
            res.status(401)
        }
    }
}

export default new UserController();