import express from "express"

const accoutRoutes = express.Router()

accoutRoutes.post('accounts')
accoutRoutes.get('accounts')
accoutRoutes.get('accounts/{accountId}')

export default accoutRoutes