import express from "express";
import { transact, report } from "../controllers/TransactionController"; 

const transRouter = express.Router()

transRouter.post("/transact", transact);
transRouter.get("/transactions", transact);
transRouter.post("/transaction/{transactionDate1, transactionDate2}", report);
transRouter.post("/transaction/{transactionId}", transact);
transRouter.put("/transaction/{transactionId}", transact);
transRouter.delete("/transaction/{transactionId}", transact)

export default transRouter