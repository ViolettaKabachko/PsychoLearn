import express, {Express, NextFunction, Request, Response} from "express";
import { userRouter } from "./Routers/userRouter";
import { authRouter } from "./Routers/authRouter";
import { secureRouter } from "./Routers/secureRouter";
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { JWTMiddleware } from "./JWTMiddleware";
import { verifyRouter } from "./Routers/verifyRouter";


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

app.use("/users/:id", JWTMiddleware)
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/secure", secureRouter);
app.use("/verify", JWTMiddleware)
app.use("/verify", verifyRouter)

app.listen(process.env.PORT, async () => {
    console.log('\x1b[36m%s\x1b[0m', "[server]: server is working at http://localhost:5000")
})

