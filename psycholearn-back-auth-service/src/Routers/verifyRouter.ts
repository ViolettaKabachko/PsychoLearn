import { Router, Request, Response } from "express";
import { IJwtPayload } from "../Interfaces/JwtPayload";
import * as jwt from 'jsonwebtoken';
import { DbClient } from "../Database/DataBaseRunner";


export const verifyRouter = Router();

verifyRouter.get("/role", async (req: Request, res: Response) => {
    const decoded = jwt.decode((req.headers.authorization as string).slice(7)) as IJwtPayload
    const uid = decoded.uid
    const role = (await DbClient.getUserById(uid))["userrole"]
    if (role > 1) {
        res.status(200).json({"msg": true})
    }
    else 
        res.status(401).json({"err": "Unauthorized"})
})
