const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const commonRoutes = require("./routes/commonRoutes");
const bodyParser = require("body-parser");
const process = require("node:process");
const cors = require("cors");
require("dotenv").config();

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
// eslint-disable-next-line no-undef
const mongoUri = process.env.MONGO_URL;

mongoose.connect(mongoUri);

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
