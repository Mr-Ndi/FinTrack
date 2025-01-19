import express from "express"
import { deleteAccount, newAccount, userAccounts } from "../controllers/AccountController"

const accoutRoutes = express.Router()

accoutRoutes.post('accounts', newAccount)
accoutRoutes.get('accounts', userAccounts)
accoutRoutes.get('accounts/{accountId}', deleteAccount)

export default accoutRoutes