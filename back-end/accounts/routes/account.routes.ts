import express from "express"
import { deleteAccount, newAccount, userAccounts } from "../controllers/AccountController"

const accountRoutes = express.Router()

accountRoutes.post('/account', newAccount)
accountRoutes.get('/accounts', userAccounts)
accountRoutes.get('/accounts/{accountId}', deleteAccount)

export default accountRoutes