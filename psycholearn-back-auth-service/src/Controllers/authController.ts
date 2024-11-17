import { Request, Response } from 'express';
import { DbClient } from '../Database/DataBaseRunner';
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from '../Interfaces/JwtPayload';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

dotenv.config()

class authController {
    // описать весь процесс проверки и выдачи
    static async verifyJWT(accessToken: string, refreshToken: string, uid: number) {
        try {
            jwt.verify(accessToken, process.env.SECRET_KEY as string) as IJwtPayload
            console.log("Access token is alive")
            return {accessToken: accessToken};
        }
        catch (e){
            let error: Error = e as Error;
            if (error.name === "TokenExpiredError") {
                // токен протух
                console.log(`Expired access, try to refresh: ${e}`)

                let user = jwt.decode(accessToken) as IJwtPayload
                let refreshSession = await DbClient.getRefreshSession(uid)
                if (refreshSession && refreshSession.refreshtoken === refreshToken) {
                    try {
                        // если не протух рефреш
                        jwt.verify(refreshSession.refreshtoken, process.env.SECRET_KEY as string)
                        let date = Math.ceil(Date.now() / 1000)
                        let newAccess = jwt.sign({...user, "exp": date + parseInt(process.env.ACCESS_TOKEN_LIFE as string)}, process.env.SECRET_KEY as string)
                        let newRefresh = jwt.sign({...user, "exp": date + parseInt(process.env.REFRESH_TOKEN_LIFE as string)}, process.env.SECRET_KEY as string)
                        await DbClient.deleteRefreshSession(user.uid)
                        await DbClient.createRefreshSession({
                            userid: user.uid,
                            refreshToken: newRefresh,
                            createdAt: date,
                            expiresAt: date + parseInt(process.env.REFRESH_TOKEN_LIFE as string)
                        })
                        console.log("new refresh: " + newRefresh)
                        console.log("New pair of tokens created")
                        return {
                            accessToken: newAccess,
                            refreshToken: newRefresh
                        }
                    }
                    
                    catch (e) {
                        console.log("Error when verifying a refresh token: " + e)
                        await DbClient.deleteRefreshSession(user.uid)
                        throw e;
                    }
                }
                else {
                    console.log("Refresh token does not match the DB's")
                    throw new JsonWebTokenError("Refresh token does not match the DB's");
                }
            }
            else if (error.name === "JsonWebTokenError") {
                console.log(`Error: ${e}`)
                throw e
            }
            else {
                console.log("Other error: " + e)
                throw e;
            }
        }
    } 

    static async login(req: Request, res: Response) {
        console.log(req.body)
        try {
            let date = Math.ceil(Date.now() / 1000)
            console.log(date)
            let user = await DbClient.getUserByEmail(req.body.email)
            console.log(user)
            if (await bcrypt.compare(req.body.password, user.userpassword)) {
                delete user.userpassword
                let payload = {...user, "exp": date + parseInt(process.env.ACCESS_TOKEN_LIFE as string)}
                let refresh_token = jwt.sign({...user, "exp": date + parseInt(process.env.REFRESH_TOKEN_LIFE as string)}, process.env.SECRET_KEY as string)
                if (await DbClient.getRefreshSession(user.uid)) {
                    res.status(409).json({"err": "User is already logged in"})
                    return
                }
                else {
                    await DbClient.createRefreshSession({
                        userid: user.uid,
                        refreshToken: refresh_token,
                        createdAt: date,
                        expiresAt: date + parseInt(process.env.REFRESH_TOKEN_LIFE as string)
                    })
                    res.status(200)
                    .cookie("refresh_token",
                        refresh_token,
                    {maxAge: date + parseInt(process.env.REFRESH_TOKEN_LIFE as string)})
                    .json({ 
                        "msg": "Logged in successfully",
                        "id": user.uid,
                        "access_token": jwt.sign(payload, process.env.SECRET_KEY as string)
                    })
                }
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

export default authController