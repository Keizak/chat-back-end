import mongoose, {Schema,InferSchemaType} from "mongoose";

export const userScheme = new Schema({
    userName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 20
    },
    phone: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 20
    },
    token: {
        type: String,
        required: true,
    },
    chatIds: {
        type: [String],
    }
})

export type UserType = InferSchemaType<typeof userScheme>

export const User = mongoose.model("User", userScheme)