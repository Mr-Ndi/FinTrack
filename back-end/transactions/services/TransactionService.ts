import { TransactionModel } from "../models/Transaction.model";
import { validateDate } from "../middleware/TransactionMiddleware"
const transaction = new TransactionModel();

export class UserTransaction{
    /**
     * Creates a transaction based on provided parameters.
     * @param accountId - The ID of the account for the transaction.
     * @param amount - The amount of the transaction.
     * @param categoryIds - An array of category IDs associated with the transaction.
     * @param description - A brief description of the transaction.
     */
    async makeTransaction(
        accountId: number,
        amount: number,
        categoryIds: number[],
        description: string
    ) {
        try {
            const createdTransaction = await transaction.createTransaction(
                accountId,
                amount,
                categoryIds,
                description
            );

            console.log('Transaction created successfully:', createdTransaction);
            return "Transaction created successfully";
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error creating transaction:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    }

     /**
     * Creates a transaction based on provided parameters.
     * @param begin - The initial date for the summary
     * @param end - The end date for our repost
     */

    async getHistory(
        begin: Date,
        end: Date
    ){
        if ( !validateDate(begin) || !validateDate(end) ) {
            throw new Error("Invalid date format. Please provide a valid date.");
        }
        try {
            const history = await transaction.getTransactionsByDateRange(begin, end)
            console.log("Histoy obtained successfully !")
            return ("Histoy obtained successfully !")
        } catch (error: any) {
            if (error instanceof Error) {
                console.error('Error getting transaction history:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    }
}