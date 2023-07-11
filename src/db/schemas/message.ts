import mongoose, {Schema,InferSchemaType} from "mongoose";

export const messageScheme = new Schema({
    text: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 200
    },
    addedAt: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },

})

export type MessageType = InferSchemaType<typeof messageScheme>

export const Message = mongoose.model("Message", messageScheme)