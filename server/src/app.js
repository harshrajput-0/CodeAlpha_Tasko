import express from "express";
import { connectDB } from "./config/db.js";


const app = express();
connectDB();

// Routes
app.get("/get", (req, res) => {
  res.json({
    message: "Project API is running",
  });
});

export default app;