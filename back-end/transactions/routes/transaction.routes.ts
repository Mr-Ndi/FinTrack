import express from "express";
import { transact, report, AccountReport, wholereport } from "../controllers/TransactionController"; 

const transRouter = express.Router()

transRouter.post("/transact", transact);
transRouter.get("/transactions", wholereport);
transRouter.post("/transaction/{transactionDate1, transactionDate2}", report);
transRouter.get("/transaction/{accountType}", AccountReport);

export default transRouter