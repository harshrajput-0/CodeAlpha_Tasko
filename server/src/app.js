import express from "express";


const app = express();

// Routes
app.get("/get", (req, res) => {
  res.json({
    message: "Project API is running",
  });
});

export default app;