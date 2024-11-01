import Router, {Response, Request} from 'express';
import bcrypt from 'bcryptjs'

export const secureRouter = Router();

secureRouter.get("/get_salt", async (req: Request, res: Response) => {
    console.log('\x1b[36m%s\x1b[0m', "[server]: POST request to /secure/get_salt")
    res.json({
        salt: await bcrypt.genSalt(10)
    })
})
