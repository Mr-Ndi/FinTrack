import express from "express"
import { newAccount } from "../controllers/AccountController"

const accoutRoutes = express.Router()

accoutRoutes.post('accounts', newAccount)
accoutRoutes.get('accounts')
accoutRoutes.get('accounts/{accountId}')

export default accoutRoutes