import express from "express"
import { newAccount, userAccounts } from "../controllers/AccountController"

const accoutRoutes = express.Router()

accoutRoutes.post('accounts', newAccount)
accoutRoutes.get('accounts', userAccounts)
accoutRoutes.get('accounts/{accountId}')

export default accoutRoutes