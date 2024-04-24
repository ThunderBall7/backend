import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"


const app = express();

// app.use() is used to configure

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({limit: "16kb"})) ///form data
app.use(express.urlencoded({extended: true, limit: "16kb"})) /// extended is used so you can send nested objects
app.use(express.static("public"))
app.use(cookieParser());

///routes

import userRouter from "./routes/user.routes.js";


//routes declarations

app.use("/api/v1/users", userRouter);

export { app }