import {Server} from "socket.io";
import {chatsDb, usersDb} from "../db/models/dataBase";
import {ChatInterface} from "../db/models";
import {nanoid} from "nanoid";
import {getUniqueIds} from "../shared/helpers/getUniqueIds";
import {Http2SecureServer} from "http2";
import http from "http";


export const createWebSocketServer = (server: http.Server | Http2SecureServer | number) => {
    try{
        console.log("Successfully create to WebSocketServer")
        const webSocketServer = new Server(server,{
            cors: {
                origin: "http://localhost:5173"
            }
        });
        webSocketServer.on('connection', (socket) => {
            socket.on('user connected', ({id,name}: { id: string, name: string }) => {
                usersDb.push({name,id,chats:[]})
                // Добавляем пользователя в комнату с его идентификатором
                socket.join(id);
            });
            socket.on('send message', ({message,chatId,userId}:{ chatId: string, message: string,userId:string }) => {
                let chatMatch = chatsDb.find((chat) => chat.id === chatId)
                let chat:ChatInterface = chatMatch || {id:chatId,messages:[]}
                if(chatMatch){
                    chat.messages = [...chatMatch.messages,{text:message,userId,id:nanoid(),addedAt:new Date().toUTCString()}]
                }
                else {
                    chat.messages = [{text: message, userId, id: nanoid(), addedAt: new Date().toUTCString()}]
                    chatsDb.push(chat)
                }
                const userIds = getUniqueIds(chat.messages)
                // Отправляем сообщение пользователю в его комнату
                userIds.forEach(id => webSocketServer.to(id).emit('update', chat))


            });


        });
    }
    catch (e){
        console.log("WebSocketServer is broken",e)
    }




}
