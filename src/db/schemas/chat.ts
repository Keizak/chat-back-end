import mongoose, {Schema,InferSchemaType} from "mongoose";
import {messageScheme} from "./message";

export const chatScheme = new Schema({
    messages: {
        type: [messageScheme],
        required: true,
    }
})

export type ChatType = InferSchemaType<typeof chatScheme>

export const Chat = mongoose.model("Chat", chatScheme)