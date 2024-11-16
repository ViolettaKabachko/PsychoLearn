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
                        let date = Date.now()
                        let newAccess = jwt.sign({...user, "exp": date + parseInt(process.env.ACCESS_TOKEN_LIFE as string)}, process.env.SECRET_KEY as string)
                        let newRefresh = jwt.sign({...user, "exp": date + parseInt(process.env.REFRESH_TOKEN_LIFE as string)}, process.env.SECRET_KEY as string)
                        await DbClient.deleteRefreshSession(user.uid)
                        await DbClient.createRefreshSession({
                            userid: user.uid,
                            refreshToken: newRefresh,
                            createdAt: date,
                            expiresAt: date + parseInt(process.env.REFRESH_TOKEN_LIFE as string)
                        })
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
        console.log('\x1b[36m%s\x1b[0m', "[server]: POST request to /auth/login")
        console.log(req.body)
        try {
            let date = Date.now()
            let user = await DbClient.getUserByEmail(req.body.email)
            console.log(user)
            if (await bcrypt.compare(req.body.password, user.userpassword)) {
                delete user.userpassword
                let payload = {...user, "exp": date + (3 * 3600) * 1000}
                let refresh_token = jwt.sign({...user, "exp": date + (7 * 24 * 3600) * 1000}, process.env.SECRET_KEY as string)
                if (await DbClient.getRefreshSession(user.uid)) {
                    res.status(409).json({"err": "User is already logged in"})
                    return
                }
                else {
                    await DbClient.createRefreshSession({
                        userid: user.uid,
                        refreshToken: refresh_token,
                        createdAt: date,
                        expiresAt: date + (7 * 24 * 3600) * 1000
                    })
                    res.status(200)
                    .cookie("refresh_token",
                        refresh_token,
                    {maxAge: date + (7 * 24 * 3600) * 1000})
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

    static async logout(req: Request, res: Response) {
        console.log("[server]: GET to /auth/logout")
        try {
            await authController.verifyJWT((req.headers.authorization as string).slice(7), req.cookies["refresh_token"], parseInt(req.params.id))
            const decoded = jwt.decode((req.headers.authorization as string).slice(7)) as IJwtPayload
            await DbClient.deleteRefreshSession(decoded.uid)
            res.status(200).json({"msg": "Logged out"})
        }
        catch (e) {
            console.log("Error was occured" + e)
            res.status(401).json({"err": "Error whe log out"})
        }
    }
}

export default authController