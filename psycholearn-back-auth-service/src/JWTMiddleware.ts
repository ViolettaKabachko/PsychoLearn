import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from './Interfaces/JwtPayload';
import { Tokens } from './Interfaces/Tokens';
import { NextFunction, Request, Response } from "express"
import authController from './Controllers/authController';

export const JWTMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let accessToken = (req.headers.authorization as string).slice(7)
    let refreshToken = req.cookies["refresh_token"]
    try {
        let id: number = (jwt.decode(accessToken) as IJwtPayload)['uid']
        console.log((jwt.decode(accessToken) as IJwtPayload))
        console.log(`Cookie: ${req.cookies["refresh_token"]}`)
        try {
            let verifyResult = await authController.verifyJWT(accessToken, refreshToken, id) as Tokens
            let date = Math.ceil(Date.now() / 1000)
            if (verifyResult.refreshToken) {
                res.locals.resBody = { 
                    "_msg": "Tokens updated successfully",
                    "access_token": verifyResult.accessToken
                }
                console.log("New pair of tokens in middleware")
                res.status(200).cookie("refresh_token", verifyResult.refreshToken, {maxAge: date + (7 * 24 * 3600) * 1000})
            }
            next()
        }
        catch (e) {
            console.log("Error was occurred when verifying the tokens: " + e)
            res.status(401).clearCookie("refresh_token").json({"err": "Tokens error"})
        }
    }
    catch (e) {
        console.log("Error with token: no fields")
        res.status(401).clearCookie("refresh_token").json({"err": "Tokens error"})
    }
    
}