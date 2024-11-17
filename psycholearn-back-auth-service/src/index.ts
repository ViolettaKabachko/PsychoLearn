import express, {Express, NextFunction, Request, Response} from "express";
import { userRouter } from "./Routers/userRouter";
import { authRouter } from "./Routers/authRouter";
import { secureRouter } from "./Routers/secureRouter";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import authController from "./Controllers/authController";
import { Tokens } from "./Interfaces/Tokens";


dotenv.config();

const app: Express = express();

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('\x1b[36m%s\x1b[0m', `[server]: ${req.method} request to ${req.path}`)
    next()
})

app.use("/users/:id", async (req: Request, res: Response, next: NextFunction) => {
    let accessToken = (req.headers.authorization as string).slice(7)
    let refreshToken = req.cookies["refresh_token"]
    try {
        let verifyResult = await authController.verifyJWT(accessToken, refreshToken, parseInt(req.params.id)) as Tokens
        let date = Math.ceil(Date.now() / 1000)
        if (verifyResult.refreshToken) {
            res.locals.resBody = { 
                "_msg": "Tokens updated successfully",
                "access_token": verifyResult.accessToken
            }
            res.status(200).cookie("refresh_token", verifyResult.refreshToken, {maxAge: date + (7 * 24 * 3600) * 1000})
        }
        next()
    }
    catch (e) {
        console.log("Error was occurred when veridfing the tokens: " + e)
        res.status(401).clearCookie("refresh_token").json({"err": "Tokens error"})
    }
})

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/secure", secureRouter);

app.listen(process.env.PORT, async () => {
    console.log('\x1b[36m%s\x1b[0m', "[server]: server is working at http://localhost:5000")
})

