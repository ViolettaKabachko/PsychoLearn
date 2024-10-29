import express, {Express, Request, Response} from "express";
import { userRouter } from "./Routers/userRouter";
import dotenv from 'dotenv'
import { DbClient } from "./Database/DataBaseRunner";

dotenv.config();

const app: Express = express();

app.use(express.json())
app.use("/users", userRouter);

app.listen(process.env.PORT, async () => {
    console.log(`[server]: server is working at http://localhost:5000`)
})

