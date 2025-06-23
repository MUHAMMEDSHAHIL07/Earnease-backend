import express from "express";
import connectDB from "./config/db.js"
import authRoute from "./routes/authRoutes.js"; 

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use("/api/auth", authRoute); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});