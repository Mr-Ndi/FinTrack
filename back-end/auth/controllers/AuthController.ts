import { Request, Response } from "express";
import { UserModel } from "../models/User.model";
import { UserService } from "../services/AuthService"

const userservice = new UserService()

const userModel = new UserModel()

export const createUser = async (req: Request, res: Response): Promise<void> =>{
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ error: "All fields (username, email, password) are required." });
        return;
    }

    try {
        const message = await userservice.registerUser(username, email, password)
        res.status(201).json({ message: "User created successfully." });
    } catch (error: unknown) {
        res.status(500).json({ error: error });
    }
};