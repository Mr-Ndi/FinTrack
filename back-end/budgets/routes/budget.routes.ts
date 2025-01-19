import express from "express"
import { setBudget } from "../controllers/BudgetController"

const budgetRoute = express.Router()

budgetRoute.post('/budgets', setBudget)