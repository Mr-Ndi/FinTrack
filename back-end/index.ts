import express, { Request, Response } from "express";
import bodyParser from "body-parser"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors());


app.listen(PORT, ()=>{
    console.log(`Server is http://localhost:${PORT}`)
})