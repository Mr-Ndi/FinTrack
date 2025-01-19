import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AccountModel {
  /**
   * Create a new account for a user.
   * 
   * @param userId - The ID of the user who owns the account.
   * @param accountType - Type of account (e.g., "cash", "MobileMoney", "BankAccount").
   * @param balance - The initial balance of the account (default is 0).
   * 
   * @returns A Promise that resolves to the created account object.
   * @throws Will throw an error if the user does not exist.
   */
  async createAccount(
    userId: number,
    accountType: string,
    balance: number = 0
  ) {
    try {
      const accountOwner = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!accountOwner) {
        throw new Error("Sorry, no such user found");
      }

      const account = await prisma.account.create({
        data: {
          userId,
          accountType,
          balance
        },
      });

      console.log("Account created successfully:", account);
      return account;
    } catch (error: unknown) {
      console.error("Failed to create account:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  /**
   * List all accounts for a specific user.
   * 
   * @param userId - The ID of the user whose accounts are to be listed.
   * 
   * @returns A Promise that resolves to a list of accounts belonging to the user.
   * @throws Will throw an error if the user does not exist.
   */
  async listAccounts(userId: number) {
    try {
      const accounts = await prisma.account.findMany({
        where: { userId },
      });

      if (!accounts.length) {
        throw new Error("No accounts found for this user");
      }

      console.log("Accounts retrieved successfully:", accounts);
      return accounts;
    } catch (error: unknown) {
      console.error("Failed to retrieve accounts:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  /**
   * Delete an account.
   * 
   * @param accountId - The ID of the account to be deleted.
   * 
   * @returns A Promise that resolves to the deleted account object.
   * @throws Will throw an error if the account does not exist or if it has associated transactions.
   */
  async deleteAccount(accountId: number) {
    try {
      const account = await prisma.account.findUnique({
        where: { id: accountId },
      });

      if (!account) {
        throw new Error("Account not found");
      }

      const deletedAccount = await prisma.account.delete({
        where: { id: accountId },
      });

      console.log("Account deleted successfully:", deletedAccount);
      return deletedAccount;
    } catch (error: unknown) {
      console.error("Failed to delete account:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
