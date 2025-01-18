import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class TransactionModel {
  /**
   * Create a new transaction.
   * @param accountId - The account associated with the transaction.
   * @param amount - The transaction amount.
   * @param categoryIds - Array of category IDs linked to this transaction.
   * @param description - A brief description of the transaction.
   * @param startDate - The start date of the range (inclusive).
   * @param endDate - The end date of the range (inclusive).
   * @returns A list of transactions within the given date range.
   */


  async createTransaction(  
    accountId: number,
    amount: number,
    categoryIds: number[],
    description: string
  ){
    try {
        const account = await prisma.account.findUnique({
            where :{id : accountId}
        })

        if (!account) {
            throw new Error('Sorry you don\'t have such account within your accounts')
        }
        const categories = await prisma.category.findMany({
            where: { id: { in: categoryIds } },
        })

        if (categories.length !== categoryIds.length) {
            throw new Error('The provided category isn\'t supported')
        }

        const transaction = await prisma.transaction.create({
            data:{
                accountId,
                amount,
                transactionDate: new Date(),
                description: description,
                category: {
                    connect: categoryIds.map((id) => ({id})),
                },
            },
        });
        const updatedBalance = account.balance + amount;
        await prisma.account.update({
            where : { id: accountId},
            data: { balance: updatedBalance},
        })
        console.log(`Transaction created successfully:`, transaction);
        return transaction;
    } catch (error:unknown) {
        console.error('Failed to create transaction:', error);
        throw error;
    }
    finally{
        await prisma.$disconnect();
    }
  }

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

      console.log(`Transactions retrieved successfully:`, transactions);
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

  async getTransactionsOnAccount(accountType: string) {
    try {
      const transactions = await prisma.transaction.findMany({
        where: {
            account:{
                accountType: accountType,
            },
        },
        include: {
          account: true,
          category: true,
        },
      });

      console.log(`Transactions retrieved successfully:`, transactions);
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
