import { Client } from "pg"
import { Config } from "../Interfaces/Config";
import { User } from "../Interfaces/User";
import { refreshSession } from "../Interfaces/refreshSession";


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
            console.log('\x1b[31m', `Error when connected to DB: `);
        }
    }

    
    async getAllUsers() {
        try {
            return (await this.client.query("SELECT uid, username, surname, email, userrole FROM users")).rows;
        } catch (e) {
            console.log('\x1b[31m', e)
        }
    }

    async getUserById(id: number) {
        let res = undefined
        try {
            res = (await this
            .client
            .query("SELECT uid, username, surname, email, userrole FROM users WHERE uid = $1", 
                [id]
            )).rows[0];
        } catch (e) {
            console.log('\x1b[31m', e);
        }
        finally {
            return res === undefined ? [] : res
        }
    }

    async getUserByEmail(email: string): Promise<any> {
        let res = undefined;
        try {
            res = (await this.client.query("SELECT uid, username, surname, email, userpassword, userrole FROM users WHERE email = $1", [email])).rows[0];
        } catch (e) {
            console.log('\x1b[31m', e);
        }
        finally {
            return res === undefined ? {} : res;
        }
    }

    async insertUser(user: User) {
        let res = undefined;
        try {
            if ((await this.getUserByEmail(user.email)).uid !== undefined) {
                res = {err: "Account with this email already exsists"}
            }
            else {
                await this.
                client.
                query("insert into users (username, surname, email, userpassword, userrole, photo, about) values ($1, $2, $3, $4, 1, '', '')",
                    [user.name, user.surname, user.email, user.password]
                )
                res = {msg: `Account has been created for ${user.email}`}
            }
        }
        catch (e) {
            console.log('\x1b[31m', `Failed to insert the user: ${e}`);
            res = {err: "Error was occured"}
        }
        finally {
            return res;
        }
    }

    async updateUsersPhoto(uid: number, pathToPhoto: string): Promise<Boolean> {
        let res: Boolean = false;
        try {
            await this.client.query("UPDATE users SET photo = $1 WHERE uid = $2", [pathToPhoto, uid])
            res = true;
        }
        catch (e) {
            console.log("Error was occurred " + e);
        }
        finally {
            return res;
        }
    }

    async getUsersPhoto(uid: number) {
        let res = undefined;
        try {
            res = (await this.client.query("SELECT photo FROM users WHERE uid = $1", [uid])).rows[0];
        } catch (e) {
            console.log('\x1b[31m', e);
        }
        finally {
            return res === undefined ? {} : res;
        }
    }

    async createRefreshSession(session: refreshSession): Promise<Boolean> {
        let res: Boolean = false;
        try {
            await this
            .client
            .query(
                "INSERT INTO refreshsession (userid, refreshtoken, createdat, expiresat) VALUES ($1, $2, $3, $4)"
                , [session.userid, session.refreshToken, session.createdAt, session.expiresAt])
            res = true;
        }
        catch (e) {
            console.log("Error was occurred " + e);
        }
        finally {
            return res;
        }
    }
}

