import { User } from "../models/userModel"

export const createUserService = async (data: object) => {
    try {
        const user = await User.create(data)  // hash password first
        return user

    } catch (err) {
        throw err
    }
}