import { BudgetModel } from "../models/Budget.model";

const budgetmodel = new BudgetModel();

export class BudgetService {
    /**
     * Creates a new budget.
     * 
     * @param userId - The user ID.
     * @param categoryId - The category ID for the budget.
     * @param amount - The amount of the budget.
     * @param accountId - Optional: Account ID for the budget.
     * @param accountType - Optional: Account type for the budget (e.g., BankAccount, MobileMoney).
     */
    async newBudget(
        userId: number,
        categoryId: number,
        amount: number,
        accountId?: number | null,
        accountType?: string | null
    ) {
        try {
            // Normalize the accountId and accountType (ensure they are null if not provided)
            const normalizedAccountId = accountId ?? null;
            const normalizedAccountType = accountType ?? null;

            // Check if either accountId or accountType is provided
            if (!normalizedAccountId && !normalizedAccountType) {
                throw new Error("Either accountId or accountType must be provided.");
            }

            // Create the budget using the model
            const budget = await budgetmodel.createBudget(
                normalizedAccountId, 
                userId, 
                normalizedAccountType, 
                categoryId, 
                amount
            );

            console.log("Budget created successfully:", budget);
            return budget; // Return the created budget for further use
        } catch (error: any) {
            console.log(`Error occurred while creating budget: ${error.message}`);
            throw error; // Rethrow the error for further handling upstream
        }
    }

    /**
     * Retrieve all budgets for a user.
     * @param userId - The user ID.
     */
    async getBudgets(userId: number) {
        try {
            const budgets = await budgetmodel.getBudgetsByUserId(userId);
            console.log("Budgets retrieved:", budgets);
            return budgets;
        } catch (error: any) {
            console.log(`Error occurred while retrieving budgets: ${error.message}`);
            throw error;
        }
    }

    /**
     * Update a specific budget by its ID.
     * @param budgetId - The ID of the budget to be updated.
     * @param accountId - Optional: New account ID for the budget.
     * @param accountType - Optional: New account type for the budget.
     * @param categoryId - New category ID to link the budget to.
     * @param amount - New amount for the budget.
     */
    async updateBudget(
        budgetId: number,
        categoryId: number,
        amount: number,
        accountId?: number | null,
        accountType?: string | null
        
    ) {
        try {
            const updatedBudget = await budgetmodel.updateBudget(
                budgetId, 
                categoryId, 
                amount,
                accountId, 
                accountType
               
            );

            console.log("Budget updated successfully:", updatedBudget);
            return updatedBudget;
        } catch (error: any) {
            console.log(`Error occurred while updating budget: ${error.message}`);
            throw error;
        }
    }

    /**
     * Delete a specific budget by its ID.
     * @param budgetId - The ID of the budget to be deleted.
     */
    async deleteBudget(budgetId: number) {
        try {
            const deletedBudget = await budgetmodel.deleteBudget(budgetId);
            console.log("Budget deleted successfully:", deletedBudget);
            return deletedBudget;
        } catch (error: any) {
            console.log(`Error occurred while deleting budget: ${error.message}`);
            throw error;
        }
    }
}
