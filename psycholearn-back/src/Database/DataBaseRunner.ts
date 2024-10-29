import { Config } from "../Interfaces/Config"
import { DataBaseClient } from "./Database"
import dotenv from 'dotenv'

dotenv.config()

const adress: Config = {
    user: process.env.DB_NAME as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string),
    database: process.env.DB_NAME as string
};

export const DbClient: DataBaseClient = new DataBaseClient(adress);
DbClient.buildConnection();