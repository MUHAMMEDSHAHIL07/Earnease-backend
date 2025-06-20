import express from "express"
import connectDB from "./config/db"

const app = express()
const PORT = process.env.PORT || 3000
connectDB()

app.listen(PORT,()=>{
    console.log(`server is running on port`,{PORT})
})