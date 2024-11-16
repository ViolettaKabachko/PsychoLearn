import { Request, Response } from 'express';
import { DbClient } from '../Database/DataBaseRunner';
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from '../Interfaces/JwtPayload';
import { User } from '../Interfaces/User';

dotenv.config()

class AuthController {
    async verifyJWT(accessToken: string) {
        try {
            const decoded = jwt.verify(accessToken, process.env.SECRET_KEY as string) as IJwtPayload
            return decoded;
        }
        catch (e) {
            console.log(`Error was occurred ${e}`)
            throw e;
        }
    } 

    async login(req: Request, res: Response) {
        console.log('\x1b[36m%s\x1b[0m', "[server]: POST request to /auth/login")
        console.log(req.body)
    
        try {
            let date = Date.now()
            let user = await DbClient.getUserByEmail(req.body.email)
            console.log(user)
            console.log(await bcrypt.compare(req.body.password, user.userpassword))
            if (await bcrypt.compare(req.body.password, user.userpassword)) {
                delete user.userpassword
                let payload = {...user, "exp": date + (3 * 3600) * 1000}
                res.status(200)
                .cookie("refresh_token",
                    jwt.sign({...user, "exp": date + (7 * 24 * 3600) * 1000}, process.env.SECRET_KEY as string),
                   {maxAge: date + (7 * 24 * 3600) * 1000, path: "auth/"})
                   .json({ 
                    "msg": "Logged in successfully",
                    "id": user.uid,
                    "access_token": jwt.sign(payload, process.env.SECRET_KEY as string)
                })
            }
            else {
                res.status(401).json({
                    "err": "Wrong password"
                })
            }
        }
        catch (e) {
            console.log(e)
            res.status(401).json({
                "err": "Account with this email does not exists"
            })
        }
    }
}

export default new AuthController()