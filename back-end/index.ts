import express, { Request, Response } from "express";
// import bodyParser from "body-parser"
import cors from "cors"
import userRoute from "./auth/routes/auth.routes"

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors());

app.use("/fintracker",userRoute)


app.listen(PORT, ()=>{
    console.log(`
        --------------------------------------\n
        Server is http://localhost:${PORT}
        --------------------------------------\n`)
})