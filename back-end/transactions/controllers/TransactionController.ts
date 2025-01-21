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
  
    try {
      const message = await transaction.makeTransaction(
        accountId,
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
                "status": 200,
                "datum": message
            })
        } catch (error: any) {
            console.error('Error getting transaction history:', error.message);
        }
    }
}

export const AccountReport = async(req: Request, res:Response): Promise <void> =>{
    const accountType = req.body;
    const token = req.headers['authorization']

    if (!accountType) {
        res.status(400).json({
            "message": "Account type required",
            "status": 400
        })
    }

    if(!token){
        res.status(401).json({
            "message": "Authorization token is required",
            "status": 401
        })
    }

    try {
        const answer = await transaction.accountHistory(accountType)
        res.status(200).json({
            "message": "Historical report generated successfully",
            "status": 200,
            "datum": answer
        })
    } catch (error: any) {
        console.error('Error getting transaction history:', error.message);
    }
}

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