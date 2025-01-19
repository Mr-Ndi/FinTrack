import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BudgetService } from "../services/BudgetService";
const budgetService = new BudgetService();

/**
 * Controller to create a new budget.
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const setBudget = async (req: Request, res: Response): Promise<any> => {
    const { categoryId, amount, accountId, accountType } = req.body;

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

    
        const budget = await budgetService.newBudget(userId, categoryId, amount, accountId, accountType);

    
        return res.status(201).json({ message: "Budget created successfully.", budget });

    } catch (error: any) {
        console.log(`Error occurred while creating budget: ${error.message}`);
        return res.status(500).json({ message: `Error occurred while creating budget: ${error.message}` });
    }
};

/**
 * Controller to update a budget by its ID.
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const updateBudget = async (req: Request, res: Response): Promise<any> => {
    const { budgetId } = req.params
    const { categoryId, amount, accountId, accountType } = req.body

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

    
        const updatedBudget = await budgetService.updateBudget(
            Number(budgetId),
            categoryId,
            amount,
            accountId,
            accountType
        );

    
        return res.status(200).json({ message: "Budget updated successfully.", updatedBudget });

    } catch (error: any) {
        console.log(`Error occurred while updating budget: ${error.message}`);
        return res.status(500).json({ message: `Error occurred while updating budget: ${error.message}` });
    }
};

/**
 * Controller to delete a budget by its ID.
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const deleteBudget = async (req: Request, res: Response): Promise<any> => {
    const { budgetId } = req.params

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

    
        const deletedBudget = await budgetService.deleteBudget(Number(budgetId));

    
        return res.status(200).json({ message: "Budget deleted successfully.", deletedBudget });

    } catch (error: any) {
        console.log(`Error occurred while deleting budget: ${error.message}`);
        return res.status(500).json({ message: `Error occurred while deleting budget: ${error.message}` });
    }
};

/**
 * Controller to retrieve all budgets for a user.
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const getBudgets = async (req: Request, res: Response): Promise<any> => {
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

    
        const budgets = await budgetService.getBudgets(userId);

    
        return res.status(200).json({ message: "Budgets retrieved successfully.", budgets });

    } catch (error: any) {
        console.log(`Error occurred while retrieving budgets: ${error.message}`);
        return res.status(500).json({ message: `Error occurred while retrieving budgets: ${error.message}` });
    }
};
