import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class TransactionModel {
  /**
   * Create a new transaction and update the balance of the associated account.
   * 
   * @param accountId - The account ID associated with the transaction.
   * @param amount - The amount of the transaction.
   * @param categoryIds - An array of category IDs linked to this transaction.
   * @param description - A brief description of the transaction.
   * 
   * @returns A Promise that resolves to the created transaction object.
   * @throws Will throw an error if the account doesn't exist or the categories are invalid.
   */
  async createTransaction(
    accountId: number,
    amount: number,
    categoryIds: number[],
    description: string
  ) {
    try {
      const account = await prisma.account.findUnique({
        where: { id: accountId },
      });

      if (!account) {
        throw new Error("Sorry, you don't have such an account within your accounts");
      }

      const categories = await prisma.category.findMany({
        where: { id: { in: categoryIds } },
      });

      if (categories.length !== categoryIds.length) {
        throw new Error("The provided category isn't supported");
      }

      // Create transaction
      const transaction = await prisma.transaction.create({
        data: {
          accountId,
          amount,
          transactionDate: new Date(),
          description: description,
          category: {
            connect: categoryIds.map((id) => ({ id })),
          },
        },
      });

      // Update account balance
      const updatedBalance = account.balance + amount;
      await prisma.account.update({
        where: { id: accountId },
        data: { balance: updatedBalance },
      });

      console.log("Transaction created successfully:", transaction);
      return transaction;
    } catch (error: unknown) {
      console.error("Failed to create transaction:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  /**
   * Retrieve all transactions within a specified date range.
   * 
   * @param startDate - The start date of the range (inclusive).
   * @param endDate - The end date of the range (inclusive).
   * 
   * @returns A Promise that resolves to a list of transactions within the date range.
   * @throws Will throw an error if the transaction retrieval fails.
   */
  async getTransactionsByDateRange(startDate: Date, endDate: Date) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          transactionDate: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          account: true,
          category: true,
        },
      });

      console.log("Transactions retrieved successfully:", transactions);
      return transactions;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to retrieve transactions:", error.message);
      } else {
        console.error("An unknown error occurred.");
      }
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  /**
   * Retrieve all transactions for a given account type.
   * 
   * @param accountType - The account type to filter transactions by (e.g., "cash", "MobileMoney", "BankAccount").
   * 
   * @returns A Promise that resolves to a list of transactions for the specified account type.
   * @throws Will throw an error if the transaction retrieval fails.
   */
  async getTransactionsOnAccount(accountType: string) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          account: {
            accountType: accountType,
          },
        },
        include: {
          account: true,
          category: true,
        },
      });

      console.log("Transactions retrieved successfully:", transactions);
      return transactions;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to retrieve transactions:", error.message);
      } else {
        console.error("An unknown error occurred.");
      }
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  /**
   * Retrieve all transactions regardless of account type.
   * 
   * @returns A Promise that resolves to a list of all transactions in the system.
   * @throws Will throw an error if the transaction retrieval fails.
   */
  async getTransactions() {
    try {
      const transactions = await prisma.transaction.findMany({
        include: {
          account: true,
          category: true,
        },
      });

      console.log("Transactions retrieved successfully:", transactions);
      return transactions;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to retrieve transactions:", error.message);
      } else {
        console.error("An unknown error occurred.");
      }
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
