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
        const account = await prisma.account.findUnique({
            where :{id : accountId}
        })

        if (!account) {
            throw new Error('Sorry you don\'t have such account within your accounts')
        }
        const categories = await prisma.category.findUnique({
            where: { id: { in: categoryIds}},
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
    } catch (error) {
        console.error('Failed to create transaction:', error.message);
        throw error;
    }
    finally{
        await prisma.$disconnect();
    }
  }
}