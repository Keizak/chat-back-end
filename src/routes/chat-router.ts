import {Router} from "express";
import {User} from "../db/schemas/user";
import {RequestWithBody} from "./types";


export const ChatRouter = Router({})


type addContactRequestType = {
    phone: number
}
ChatRouter.post("/add-contact", async (req: RequestWithBody<addContactRequestType>, res) => {
    try {
        const {token} = req.headers

        if (token) {
            const matchUser = await User.findOne({token: token})
            if (matchUser) {

                const matchContact = await User.findOne({phone: req.body.phone})

                if(matchContact) {
                    matchUser.chatIds = [...matchUser.chatIds,matchContact.id]
                    matchUser.save()
                    res.status(200).send()
                }
                else{
                    res.status(500).send({message:"Такого контакта не существует"})
                }




            } else return res.status(401).send()
        } else return res.status(401).send()
    } catch (e) {
        console.log(e)
        return res.status(403)
    }

})

type getUserRequestType = {
    id: string
}

ChatRouter.get("/get-user/:id", async (req, res) => {
    try {
        const {token} = req.headers

        if (token) {
            const user = await User.findOne({token: token})

            if (user) {
                const findId = req.params.id
                console.log(findId,"findId")
                const matchUser = await User.findOne({_id: findId})

                console.log(matchUser,"matchUser")
                if(matchUser)   res.status(200).send(matchUser)
                else res.status(500).send({message:"Такого пользотваеля не существует"})

            } else return res.status(401).send()
        } else return res.status(401).send()
    } catch (e) {
        console.log(e)
        return res.status(403)
    }

})
