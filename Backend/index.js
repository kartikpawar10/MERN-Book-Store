import express, { Router } from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import router from "./routes/router.js";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use("/books", router);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server is Listening on " + port);
    });
  } catch (error) {
    console.log("Server is not connected");
  }
};

start();
