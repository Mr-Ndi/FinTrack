import { UserTransaction } from "../services/TransactionService"
import { Request, Response } from "express"
const transaction = new UserTransaction();

export const transact = async( req: Request, res: Response ): Promise <void> =>{
    const { accountId, amount, categoryIds, description } = req.body;
    const token = req.headers['authorization'];

    if (!accountId || !amount || !categoryIds || !description) {
        res.status(400).json({
            "message": "Hey all fields datum are reduired",
            "status": 400
        });
        return;
    }
    if (!token){
        res.status(401).json({
            "message": "Authorization token is require",
            "status": 401
        });
        return;
    }

    try {
        const message = await transaction.makeTransaction(accountId, amount, categoryIds, description)
        res.status(200).json({
            "message": "Transaction created successfully",
            "status": 200
        })
    } catch (error:any) {
        console.error('Error getting transaction history:', error.message);
    }
}

export const report = async(req: Request, res: Response): Promise <void>=>{
    const { initial, final } = req.body;
    const token = req.headers['authorization'];

    if (!initial || !final) {
        res.status(400).json({
            "message": "All date required",
            "status": 400
        })
    
        if(!token){
            res.status(401).json({
                "message": "Authorization token is required",
                "status": 401
            })
        }

        try {
            const message = await transaction.getHistory(initial, final)
            res.status(200).json({
                "meaasge": "Historical report generated successfully",
                "status": 200
            })
        } catch (error: any) {
            console.error('Error getting transaction history:', error.message);
        }
    }
}

