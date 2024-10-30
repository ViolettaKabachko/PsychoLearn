import express, {Express, Request, Response} from "express";
import { userRouter } from "./Routers/userRouter";
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}))
app.use(express.json())
//app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRouter);

app.listen(process.env.PORT, async () => {
    console.log('\x1b[36m%s\x1b[0m', "[server]: server is working at http://localhost:5000")
})

