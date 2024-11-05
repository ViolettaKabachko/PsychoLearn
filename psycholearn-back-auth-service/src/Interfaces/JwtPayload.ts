import * as jwt from 'jsonwebtoken';

export interface IJwtPayload extends jwt.JwtPayload {
    uid: number,
    username: string,
    surname: string,
    email: string,
    userrole: number,
    exp: number,
    iat: number
}