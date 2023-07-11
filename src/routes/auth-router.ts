import {Router} from "express";
import {RequestWithBody} from "./types";
import {User} from "../db/schemas/user";
import {v4 as uuidv4} from 'uuid';

export const AuthRouter = Router({})

export type AuthPostType = {
    token: string
}

AuthRouter.post("/me", async (req, res) => {
    try {
        const {token} = req.headers

        if (token) {
            const matchUser = await User.findOne({token: token})

            if (matchUser) {
                return res.status(200).send()
            }
            else return res.status(401)
        }
    } catch (e) {
        console.log(e)
        return res.status(403)
    }

})

export type RegisterUserPostType = {
    userName: string;
    password: string;
    phone: string;
}

AuthRouter.post("/register", async (req: RequestWithBody<RegisterUserPostType>, res) => {
    try {
        const {userName, phone, password} = req.body
        const user = await new User({
            userName, phone, password, chatIds: [], token: uuidv4()
        })

        const newUser = await user.save()
        console.log("Новый юзер добавлен")
        return res.status(200).send(newUser)
    } catch (e) {
        const message = `При добавлении юзера ошибка :${e}`
        console.log(message)
        return res.status(403).send({message: message})
    }


})
