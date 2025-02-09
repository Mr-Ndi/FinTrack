import { UserTransaction } from "../services/TransactionService"
import { Request, Response } from "express"
const transaction = new UserTransaction();

export const transact = async (req: Request, res: Response): Promise<void> => {
    const { accountId, amount, categoryIds, description } = req.body;
    const token = req.headers["authorization"];

    if (!accountId || !amount || !categoryIds || !description) {
        res.status(400).json({
            message: "All fields (accountId, amount, categoryIds, description) are required.",
            status: 400,
        });
        return;
    }
    if (!token) {
        res.status(401).json({
            message: "Authorization token is required.",
            status: 401,
        });
        return;
    }
    const accountIdAsNumber = parseInt(accountId, 10);
    if (isNaN(accountIdAsNumber)) {
        res.status(400).json({
            message: "Invalid accountId provided. It must be a number.",
            status: 400,
        });
        return;
    }

    try {
        const message = await transaction.makeTransaction(
            accountIdAsNumber,
            amount,
            categoryIds,
            description
        );
        res.status(200).json({
            message: "Transaction created successfully",
            status: 200,
            data: message,
        });
    } catch (error: any) {
        console.error("Error creating transaction:", error.message);
        res.status(500).json({
            message: "Failed to create transaction.",
            status: 500,
            error: error.message,
        });
    }
};

type ReportParams = {
    transactionDate1: string;
    transactionDate2: string;
};

export const report = async (req: Request<ReportParams>, res: Response): Promise<void> => {
    const { transactionDate1, transactionDate2 } = req.params;
    const token = req.headers["authorization"];

    if (!transactionDate1 || !transactionDate2) {
        res.status(400).json({
            message: "Both transaction dates are required",
            status: 400,
        });
        return;
    }

    if (!token) {
        res.status(401).json({
            message: "Authorization token is required",
            status: 401,
        });
        return;
    }

    const date1 = new Date(transactionDate1);
    const date2 = new Date(transactionDate2);

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
        res.status(400).json({
            message: "Invalid date format",
            status: 400,
        });
        return;
    }

    try {

        const message = await transaction.getHistory(date1, date2)
        res.status(200).json({
            message: "Historical report generated successfully",
            status: 200,
            datum: message,
        });
    } catch (error: any) {
        console.error("Error getting transaction history:", error.message);
        res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
};

export const AccountReport = async (req: Request, res: Response): Promise<void> => {
    const { accountType } = req.params;
    const token = req.headers['authorization'];

    if (!accountType) {
        res.status(400).json({
            message: "Account type required",
            status: 400,
        });
        return;
    }

    if (!token) {
        res.status(401).json({
            message: "Authorization token is required",
            status: 401,
        });
        return;
    }

    try {
        const answer = await transaction.accountHistory(accountType);
        res.status(200).json({
            message: "Historical report generated successfully",
            status: 200,
            datum: answer,
        });
    } catch (error: any) {
        console.error("Error getting transaction history:", error.message);
        res.status(500).json({
            message: "Internal server error",
            status: 500,
        });
    }
};

export const wholereport = async(req: Request, res: Response): Promise <void> =>{
    const token = req.headers['authorization']
    if(!token){
        res.status(401).json({
            "message": "Authorization token is required",
            "status": 401
        })
    }

    try {
        const answer = await transaction.allAccounts()
        res.status(200).json({
            "message": "Historical report generated successfully",
            "status": 200,
            "datum": answer
        })

    } catch (error:any) {
        console.error('Error getting transaction history:', error.message);
    }
}