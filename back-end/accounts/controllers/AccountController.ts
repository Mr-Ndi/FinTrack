import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { accountServices } from "../services/AccountService";

const service = new accountServices();

/**
 * Controller to create a new account for a logged-in user.
 * It uses the JWT token from the request to get the userId and create the account.
 */
export const newAccount = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers['authorization']?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No authorization token provided." });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    const userId = decoded.userId;

    const { accountType, balance = 0 } = req.body;

    if (!accountType) {
      return res.status(400).json({ message: "Account type is required." });
    }

    const newAccount = await service.newAccount(userId, accountType, balance);

    res.status(201).json({
      message: "Account created successfully.",
      account: newAccount,
    });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Controller to list all account for a logged-in user.
 * It uses the JWT token from the request to get the userId and create the account.
 */
export const userAccounts = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers['authorization']?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No authorization token provided." });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    const userId = decoded.userId;

    const accounts = await service.userAccounts(userId);
    console.log("Fetched accounts for user:", accounts);

    res.status(201).json({
      message: "Account listing act performed successfully.",
      account: accounts || [],
    });
  } catch (error) {
    console.error("Error listing accounts:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


/**
 * Controller to a specified account for a logged-in user.
 * It uses the JWT token from the request to authenticate account owner.
 */
export const deleteAccount = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.headers['authorization']?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No authorization token provided." });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    const userId = decoded.userId;
    const accountId = req.params.accountId;

    if (!accountId) {
      return res.status(400).json({ message: "Account ID is required." });
    }

    await service.delete_Accounts(userId);
    res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
