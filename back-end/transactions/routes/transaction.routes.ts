import express from "express";
import { transact, report, AccountReport } from "../controllers/TransactionController"; 

const transRouter = express.Router()

transRouter.post("/transact", transact);
// transRouter.get("/transactions", transact);
transRouter.post("/transaction/{transactionDate1, transactionDate2}", report);
transRouter.get("/transaction/{accountType}", AccountReport);
// transRouter.put("/transaction/{transactionId}", transact);
// transRouter.delete("/transaction/{transactionId}", transact)

export default transRouter