import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from './routes/user.routes.js';

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes

const API_PREFIX = "/api/v1";



app.use(`${API_PREFIX}/users`, userRouter);




app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
  });
});

export default app;
