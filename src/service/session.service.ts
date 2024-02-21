import { Session } from "../models/sessionModel";

export const createSessionService = async (input: object) => {
    try {
        const session = await Session.create(input)
        return session
        
    } catch (err) {
        throw err
    }
}