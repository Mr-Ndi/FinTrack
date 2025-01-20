import express, { Request, Response } from "express";
import morgan from "morgan"
import cors from "cors"
import userRoute from "./auth/routes/auth.routes"
import accountRoutes from "./accounts/routes/account.routes";
import budgetRoute from "./budgets/routes/budget.routes";
import categoryRouter from "./categories/routes/category.routes";
import transRouter from "./transactions/routes/transaction.routes";

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(morgan('dev'))

app.use("/fintracker",userRoute)
app.use("/fintracker",accountRoutes)
app.use("/fintracker",budgetRoute)
app.use("/fintracker",categoryRouter)
app.use("/fintracker",transRouter)


app.listen(PORT, ()=>{
    console.log(`
        --------------------------------------\n
        I. Server is http://localhost:${PORT}
        II. https://fintrack-7xtb.onrender.com/
        --------------------------------------\n`)
})