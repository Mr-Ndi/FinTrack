import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class BudgetModel {
  /**
   * Create a new budget.
   * The budget can be for a specific account type, a specific account, or global.
   * 
   * @param userId - The user ID.
   * @param accountId - Optional: The specific account ID for the budget.
   * @param accountType - Optional: The account type for the budget (MobileMoney, BankAccount, etc.).
   * @param categoryId - The category to link the budget to.
   * @param amount - The budget amount.
   * @returns A promise with the created budget.
   */
  async createBudget(accountId: number | null, userId: number, accountType: string | null, categoryId: number, amount: number) {
    try {
      if (!accountId && !accountType) {
        throw new Error("Either accountId or accountType must be provided.");
      }

      const budgetData: {
        userId: number;
        accountId?: number | null;
        accountType?: string | null;
        categoryId: number;
        amount: number;
      } = {
        userId,
        categoryId,
        amount,
      };

      if (accountId !== null && accountId !== undefined) {
        budgetData.accountId = accountId;
      } else if (accountType) {
        budgetData.accountType = accountType;
      }

      const budget = await prisma.budget.create({
        data: budgetData,
      });

      console.log(`Budget created successfully:`, budget);
      return budget;
    } catch (error: unknown) {
      console.error("Failed to create budget:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  /**
   * Retrieve all budgets for a user with optional relations (account, category).
   * 
   * @param userId - The user ID to filter by.
   * @param includeAccount - Optional: If true, include account details.
   * @param includeCategory - Optional: If true, include category details.
   * @returns A promise with the list of budgets.
   */
  async getBudgetsByUserId(userId: number, includeAccount: boolean = true, includeCategory: boolean = true) {
    try {
      // Build the dynamic include object based on the parameters
      const include: any = {};

      if (includeAccount) {
        include.account = true;
      }

      if (includeCategory) {
        include.category = true;
      }

      // Retrieve budgets with dynamic includes
      const budgets = await prisma.budget.findMany({
        where: {
          userId,
        },
        include: include, // Apply the dynamic include object
      });

      return budgets;
    } catch (error: unknown) {
      console.error("Failed to retrieve budgets:", error);
      throw error;
    } finally {
      await prisma.$disconnect();  // Ensure Prisma client disconnects after operation
    }
  }

  /**
   * Update an existing budget.
   * 
   * @param budgetId - The budget ID to be updated.
   * @param accountId - Optional: New account ID for the budget.
   * @param accountType - Optional: New account type for the budget.
   * @param categoryId - New category ID to link the budget to.
   * @param amount - New amount for the budget.
   * @returns A promise with the updated budget.
   */
  async updateBudget(budgetId: number, categoryId: number, amount: number, accountId?: number | null, accountType?: string | null) {
    try {
      const updateData: {
        accountId?: number | null;
        accountType?: string | null;
        categoryId: number;
        amount: number;
      } = {
        categoryId,
        amount,
      };
  
      if (accountId !== undefined) {
        updateData.accountId = accountId;
      }
      if (accountType !== undefined) {
        updateData.accountType = accountType;
      }
  
      const updatedBudget = await prisma.budget.update({
        where: {
          id: budgetId,
        },
        data: updateData,
      });
  
      console.log(`Budget updated successfully:`, updatedBudget);
      return updatedBudget;
    } catch (error: unknown) {
      console.error("Failed to update budget:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
  

  /**
   * Delete a budget.
   * 
   * @param budgetId - The budget ID to be deleted.
   * @returns A promise indicating the deletion result.
   */
  async deleteBudget(budgetId: number) {
    try {
      const deletedBudget = await prisma.budget.delete({
        where: {
          id: budgetId,
        },
      });

      console.log(`Budget deleted successfully:`, deletedBudget);
      return deletedBudget;
    } catch (error: unknown) {
      console.error("Failed to delete budget:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
