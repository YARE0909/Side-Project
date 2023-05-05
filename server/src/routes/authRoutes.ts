import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";
import { Types } from "mongoose";
import bcrypt from "bcrypt";

router.post("/signup", async (req, res) => {
    // Aliasing email and password to _email and _password respectively.
    const {
        email: _email,
        password: _password,
        userName: _userName,
    } = req.body;
    try {
        const generatedId = new Types.ObjectId();
        const checkUser = await prisma.user.findUnique({
            where: { email: _email },
        });
        if (checkUser) {
            return res.status(302).send("Email already exists");
        }
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(_password, salt, async function (err, hash) {
                const user = await prisma.user.create({
                    data: {
                        email: _email,
                        password: hash,
                        id: String(generatedId),
                        userName: _userName,
                    },
                });
                const token = jwt.sign({ userId: user.id }, "MY_SECRET_KEY");
                res.send({ token });
            });
        });
    } catch (err) {
        return res.status(422).send((err as Error).message);
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
        select: { password: true, id: true },
    });

    if (!user) {
        return res.status(404).send({ error: "Email not found" });
    }
    try {
        bcrypt.compare(_password, user.password, function (err, response) {
            if (err) throw err;
            if (response) {
                const token = jwt.sign({ userId: user.id }, "MY_SECRET_KEY");
                res.send({ token });
            } else {
                return res.status(422).send({ error: "Wrong Password" });
            }
        });
    } catch (err) {
        return res.status(422).send({ error: "Invalid credentials" });
    }
});

export default router;
