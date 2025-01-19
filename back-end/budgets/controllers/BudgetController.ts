import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { BudgetService } from "../services/BudgetService";

const budgetserver = new BudgetService()

export const setBudget = async (req: Request, res: Response): Promise <any> =>{
    const { categoryId, amount, accountId, accountType } = req.body
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
              const message = budgetserver.newBudget(userId, categoryId, amount, accountId, accountType)
    } catch (error:any) {
        console.log(`Error occured ${ error.message }`)
    }

}