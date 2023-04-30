const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const prisma = require("../../utils/prisma");

router.post("/profile", async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    const token = authorization.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, "MY_SECRET_KEY");
        const userId = decoded.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        res.send({ email: user.email, userName: user.userName });
    } catch (err) {
        res.status(422).send({ error: err });
    }
});

router.post("/post", async (req, res) => {
    const { authorization } = req.headers;
    const { title: _title, content: _content } = req.body;
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    const token = authorization.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, "MY_SECRET_KEY");
        const userId = decoded.userId;
        await prisma.post.create({
            data: {
                title: _title,
                content: _content,
                authorId: String(userId),
            },
        });
        res.status(200).send("Post created successfully!");
    } catch (err) {
        console.log(err);
        res.status(422).send({ error: err });
    }
});

router.delete("/delete", async (req, res) => {
    const { id: _id } = req.query;
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    try {
        await prisma.post.delete({
            where: {
                id: _id,
            },
        });
        res.status(200).send(`Post ${_id} deleted`);
    } catch (err) {
        res.status(422).send({ error: err.meta.cause });
    }
});

router.get("/getUserPosts", async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    const token = authorization.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, "MY_SECRET_KEY");
        const userId = decoded.userId;
        const posts = await prisma.post.findMany({
            where: {
                authorId: String(userId),
            },
        });
        res.status(200).send(posts);
    } catch (err) {
        console.log(err);
        res.status(422).send({ error: err });
    }
});

module.exports = router;
