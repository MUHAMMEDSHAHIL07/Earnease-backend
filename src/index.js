import express from "express";
import connectDB from "./config/db.js"
import authRoute from "./routes/authRoutes.js"; 
import studentRoute from "./routes/studentRoute.js"
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use(cookieParser()); 
app.use("/api/auth", authRoute); 
app.use("/student",studentRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});