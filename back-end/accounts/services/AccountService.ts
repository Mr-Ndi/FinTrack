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

    /**
   * Listing accounts for a user.
   * 
   * @param userId - The ID of the user who owns the account.
   **/
    async userAccounts(
        userId: number
    ){
        try {
            const Accounts = await accountInstance.listAccounts(
                userId,
            );
            console.log("Account listing act perfomed succesfully");
            return Accounts
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error listing transaction:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    }

    /**
   * Deleting accounts for a logged user.
   * 
   * @param accountType - Type of account (e.g., "cash", "MobileMoney", "BankAccount").
   **/
    async delete_Accounts(
        accountType: string
    ){
        try {
            await accountInstance.deleteAccount(
                accountType,
            );
            console.log("Account deletion act perfomed succesfully");
            return ("Account deletion act perfomed succesfully");
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error deleting transaction:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
        }
    }
}