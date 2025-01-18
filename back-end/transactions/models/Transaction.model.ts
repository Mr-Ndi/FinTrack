import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class TransactionModel {
  /**
   * Create a new transaction.
   * @param accountId - The account associated with the transaction.
   * @param amount - The transaction amount.
   * @param categoryIds - Array of category IDs linked to this transaction.
   * @param description - A brief description of the transaction.
   */


  async createTransaction(
    accountId: number,
    amount: number,
    categoryIds: number[],
    description: string
  ){
    try {
        
    } catch (error) {
        
    }
  }
}