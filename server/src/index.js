const express = require("express");
const mongoose = require("mongoose");
const prisma = require("../utils/prisma.js");
const requireAuth = require("./middlewares/requireAuth.js");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

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

app.get("/", requireAuth, (req, res) => {
  res.send("Hello There");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
