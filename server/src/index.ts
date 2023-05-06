import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import commonRoutes from "./routes/commonRoutes";
import bodyParser from "body-parser";
import process from "node:process";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(authRoutes);
app.use(userRoutes);
app.use(commonRoutes);
const mongoUri = process.env.MONGO_URL;

mongoose.connect(mongoUri as string);

mongoose.connection.on("connected", () => {
    console.log("Connected to mongo instance");
});
mongoose.connection.on("error", err => {
    console.error("Error connecting to mongo", err);
});

app.get("/", (req, res) => {
    res.send("Hello There");
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
