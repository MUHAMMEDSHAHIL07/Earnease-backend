import express from "express";
import connectDB from "./config/db.js"
import authRoute from "./routes/authRoutes.js"; 
import studentRoute from "./routes/studentRoute.js"
import employerRoute from "./routes/employerRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors({
  origin:"http://localhost:5173",credentials: true
}))

app.use(express.json());
app.use(cookieParser()); 
app.use("/api/auth", authRoute); 
app.use("/student",studentRoute)
app.use("/api/employer",employerRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});