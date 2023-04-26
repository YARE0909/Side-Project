const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

const mongoUri = process.env.MONGO_URL;

const PORT = 3001;

mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
