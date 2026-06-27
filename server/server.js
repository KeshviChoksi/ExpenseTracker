import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import expenseRoutes from "./routes/expenses.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(".")); // serves index.html

// Connect to MongoDB
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db("expenseiq");
console.log("Connected to MongoDB");

// Routes
app.use("/api/expenses", expenseRoutes(db));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
