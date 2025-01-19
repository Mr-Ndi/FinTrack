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
   * 
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
}
