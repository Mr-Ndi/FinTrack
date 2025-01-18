import { TransactionModel } from "../models/Transaction.model";

const transaction = new TransactionModel();

/**
 * Creates a transaction based on provided parameters.
 * @param accountId - The ID of the account for the transaction.
 * @param amount - The amount of the transaction.
 * @param categoryIds - An array of category IDs associated with the transaction.
 * @param description - A brief description of the transaction.
 */
async function history(
    accountId: number,
    amount: number,
    categoryIds: number[],
    description: string
) {
    try {
        // Create a new transaction
        const createdTransaction = await transaction.createTransaction(
            accountId,
            amount,
            categoryIds,
            description
        );

        console.log('Transaction created successfully:', createdTransaction);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error creating transaction:', error.message);
        } else {
            console.error('An unknown error occurred:', error);
        }
    }
}