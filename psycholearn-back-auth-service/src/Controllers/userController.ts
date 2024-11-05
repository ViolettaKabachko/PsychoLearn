import {Response, Request} from 'express';
import { DbClient } from '../Database/DataBaseRunner';
import { User, userGuard } from '../Interfaces/User';
import { IJwtPayload } from '../Interfaces/JwtPayload';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

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
            const decoded = jwt.verify((req.headers.authorization as string).slice(7), process.env.SECRET_KEY as string) as IJwtPayload
            let user = await DbClient.getUserById(parseInt(req.params.id))
            if (decoded.uid === user.uid)
                res.json(user)
            else {
                delete user.email, user.uid, user.role
                res.json(user)
            }
        }
        catch (e) {
            res.json({err: "token exipred"}).status(401)
        }
    }
}

export default new UserController();