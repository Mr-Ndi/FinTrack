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
    } catch (error: any) {
      if (error.message === "Email is already in use.") {
        res.status(409).json({ error: error.message });
      } else if (error.message === "Password must be at least 8 characters long.") {
        res.status(400).json({ error: error.message });
      } else if (error.message === "All fields (username, email, and password) are required.") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      };
    }
};
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  try {
    const token = await userservice.authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error: unknown) {
    res.status(401).json({ error: error });
  }
};
