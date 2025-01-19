import { AccountModel } from "../models/Account.model"

const accountInstance = new AccountModel

export class accountServices {

    /**
   * Create a new account for a user.
   * 
   * @param userId - The ID of the user who owns the account.
   * @param accountType - Type of account (e.g., "cash", "MobileMoney", "BankAccount").
   * @param balance - The initial balance of the account (default is 0).
   **/
   
    async newAccount(
        userId: number,
        accountType: string,
        balance: number
    ){
        try {
            const Account = await accountInstance.createAccount(
                userId,
                accountType,
                balance
            );
            console.log("Account created succesfully");
            return ("Account created succesfully")
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error creating transaction:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    }
}