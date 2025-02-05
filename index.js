import * as dotenv from "dotenv"
dotenv.config({path:"./config/.env"})
process.on("uncaughtException", (err) => {
  console.log(err);
});
import * as cors from 'cors'
import express from "express";
import { dbcon } from "./database/dbconnection.js";
import jwt from "jsonwebtoken";
import userRouter from "./src/modules/user/user.routes.js";
import noteRouter from "./src/modules/note/note.routes.js";
import User from "./database/models/user.model.js";
import { AppError } from "./src/utils/appError.js";
import { globalError } from "./src/middleware/globalError.js";
const app = express();
const port = process.env.PORT||4000;
const corsOptions ={
  origin: '*',  // Your React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
  credentials: true, 
}
app.use(cors(corsOptions));
app.options('*', cors())
app.use(express.json());
app.use("/auth", userRouter);
app.use("/notes", noteRouter);
app.get("/verify/:token", async (req, res, next) => {
  jwt.verify(req.params.token,process.env.SECRET_KEY, async (err, payload) => {
    if (err) return next(new AppError(err.message, 401));
    await User.findOneAndUpdate(
      { email: payload.email },
      { confirmEmail: true }
    );
    res.status(200).json({ message: "email confirmed", email: payload.email });
  });
});

app.use("/*", (req, res, next) => {
  next(new AppError(`Route Not Found ${req.originalUrl}`, 404));
});
app.use(globalError);

process.on("unhandledRejection", (err) => {
  console.log(err);
});
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
