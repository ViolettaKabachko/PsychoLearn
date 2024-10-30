import Router, {Response, Request} from 'express';
import { User } from '../Interfaces/User';
import { DbClient } from '../Database/DataBaseRunner';
import bodyParser from 'body-parser';

export const userRouter = Router();


userRouter.get("/:id", async  (req: Request, res: Response) => {
    console.log('\x1b[36m%s\x1b[0m', `[server]: GET request to /users/${req.params.id}`)
    res.json(await DbClient.getUserById(parseInt(req.params.id)));
})


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
    console.log('\x1b[36m%s\x1b[0m', "[server]: POST request to /users/")
    console.log(req.body)
    try {
        res.json(await DbClient.insertUser(req.body as User)).status(200);
    }
    catch (e) {
        console.log(e);
        res.status(401);
    }
})