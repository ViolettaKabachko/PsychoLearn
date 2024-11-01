import Router, {Response, Request} from 'express';
import { User, userGuard } from '../Interfaces/User';
import { DbClient } from '../Database/DataBaseRunner';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
export const userRouter = Router();


userRouter.get("/", async (req: Request, res: Response) => {
    console.log('\x1b[36m%s\x1b[0m', `[server]: GET request to /users/`)
    try {
        res.json(await DbClient.getAllUsers());
    }
    catch (e) {
        console.log(e);
    }
})

userRouter.post("/", async (req: Request, res: Response) => {
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
})

userRouter.get("/:id", async  (req: Request, res: Response) => {
    console.log('\x1b[36m%s\x1b[0m', `[server]: GET request to /users/${req.params.id}`)
    console.log(jwt.decode((req.headers.authorization as string).slice(7)))
    res.json(await DbClient.getUserById(parseInt(req.params.id)));
})
 