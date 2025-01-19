import { BudgetModel } from "../models/Budget.model";

const budgetmodel = new BudgetModel();

export class BudgetService {
    async newBudget(
        userId: number,
        categoryId: number,
        amount: number,
        accountId?: number | null,
        accountType?: string | null
    ) {
        try {
            const normalizedAccountId = accountId ?? null;

            const normalizedAccountType = accountType ?? null;

            const budget = await budgetmodel.createBudget(
                normalizedAccountId, userId, normalizedAccountType, categoryId, amount
            );

            console.log("Budget created:", budget);
        } catch (error: any) {
            console.log(`Error occurred: ${error.message}`);
        }
    }
}
