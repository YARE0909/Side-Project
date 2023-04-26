const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const prisma = require("../../utils/prisma");
const { Types } = require("mongoose");
const bcrypt = require("bcrypt");

// Function to compare passwords
function password(givenPassword, actualPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(actualPassword, givenPassword, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
}

router.post("/signup", async (req, res) => {
  // Aliasing email and password to _email and _password respectively.
  const { email: _email, password: _password } = req.body;
  try {
    const generatedId = new Types.ObjectId();
    const user = await prisma.user.create({
      data: { email: _email, password: _password, id: String(generatedId) },
    });
    const token = jwt.sign({ userId: user.id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  // Aliasing email and password to _email and _password respectively.
  const { email: _email, password: _password } = req.body;
  if (!_email || !_password) {
    return res.status(422).send({ error: "Must provide credentials" });
  }
  const user = await prisma.user.findUnique({
    where: { email: _email },
    select: { password: true },
  });

  if (!user) {
    return res.status(404).send({ error: "Email not found" });
  }
  try {
    await comparePassword(_password, user.password);
    const token = jwt.sign({ userId: user.id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid credentials" });
  }
});

module.exports = router;
