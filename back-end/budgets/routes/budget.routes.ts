import express from "express";
import { 
    setBudget, 
    updateBudget, 
    deleteBudget, 
    getBudgets 
} from "../controllers/BudgetController";

const budgetRoute = express.Router();
budgetRoute.post('/budgets', setBudget);
budgetRoute.put('/budgets/:budgetId', updateBudget);
budgetRoute.delete('/budgets/:budgetId', deleteBudget);
budgetRoute.get('/budgets', getBudgets);

export default budgetRoute;
