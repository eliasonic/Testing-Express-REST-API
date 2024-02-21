import { Request, Response, NextFunction } from "express";
import { createUserService } from "../service/user.service";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        
        const user = await createUserService(data)

        res.status(201).send({
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        })
    } catch (err) {
        return next(err)
    }
}