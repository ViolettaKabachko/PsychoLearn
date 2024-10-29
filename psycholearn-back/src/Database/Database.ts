import { Client } from "pg"
import { Config } from "../Interfaces/Config";
import { User } from "../Interfaces/User";


export class DataBaseClient {
    client: Client;

    constructor(adress: Config) {
        this.client = new Client(adress);
    }
    
    async buildConnection(): Promise<void> {
        try {
            await this.client.connect();
        }
        catch (e) {
            console.log(`Error when connected to DB: ${e}`);
        }
    }

    
    async getAllUsers() {
        try {
            return (await this.client.query("SELECT uid, username, surname, email, userrole FROM users")).rows;
        } catch (e) {
            console.log(e)
        }
    }

    async getUser(id: number) {
        try {
            return (await this
            .client
            .query("SELECT uid, username, surname, email, userrole FROM users WHERE uid = $1", 
                [id]
            )).rows;
        } catch (e) {
            console.log(e);
        }
    }

    async insertUser(user: User) {
        try {
            return (await this.
            client.
            query("insert into users (username, surname, email, userpassword, userrole) values ($1, $2, $3, $4, 1)",
                [user.name, user.surname, user.email, user.password]
            )).rows
        }
        catch (e) {
            console.log(`Failed to insert the user: ${e}`);
        }
    }
}

