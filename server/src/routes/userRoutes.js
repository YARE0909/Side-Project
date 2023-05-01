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
    if (!_title || !_content || (!_title && !_content)) {
        return res
            .status(401)
            .send({ error: "Provide all the required fields" });
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

router.delete("/post/delete", async (req, res) => {
    const { id: _id } = req.query;
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    if (!_id) {
        return res.status(401).send({ error: "Provide a post ID" });
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

router.delete("/comment/delete", async (req, res) => {
    const { id: _id } = req.query;
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    if (!_id) {
        return res.status(401).send({ error: "Provide a comment ID" });
    }
    try {
        await prisma.comment.delete({
            where: {
                id: _id,
            },
        });
        res.status(200).send(`Comment ${_id} deleted`);
    } catch (err) {
        res.status(422).send({ error: err });
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
        res.status(422).send({ error: err });
    }
});

router.post("/post/like", async (req, res) => {
    const { authorization } = req.headers;
    const { postId: _postId } = req.body;
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    if (!_postId) {
        return res.status(401).send({ error: "Provide a post ID" });
    }
    const token = authorization.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, "MY_SECRET_KEY");
        const userId = decoded.userId;
        const check = await prisma.like.findMany({
            where: {
                userId: userId,
                postId: _postId,
            },
        });
        if (check.length !== 0) {
            await prisma.like.delete({
                where: {
                    id: check[0].id,
                },
            });
            return res.send("Post unliked");
        }
        await prisma.like.create({
            data: {
                userId: userId,
                postId: _postId,
            },
        });
        res.send(`Post ${_postId} liked`);
    } catch (err) {
        res.status(422).send({ error: err });
    }
});
router.post("/comment/like", async (req, res) => {
    const { authorization } = req.headers;
    const { commentId: _commentId } = req.body;
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    if (!_commentId) {
        return res.status(401).send({ error: "Provide a comment ID" });
    }
    const token = authorization.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, "MY_SECRET_KEY");
        const userId = decoded.userId;
        const check = await prisma.like.findMany({
            where: {
                userId: userId,
                commentId: _commentId,
            },
        });
        if (check.length !== 0) {
            await prisma.like.delete({
                where: {
                    id: check[0].id,
                },
            });
            return res.send("Comment unliked");
        }
        await prisma.like.create({
            data: {
                userId: userId,
                commentId: _commentId,
            },
        });
        res.send(`Comment ${_commentId} liked`);
    } catch (err) {
        console.log(err);
        res.status(422).send({ error: err });
    }
});

router.post("/post/comment", async (req, res) => {
    const { authorization } = req.headers;
    const { postId: _postId, content: _content } = req.body;
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in" });
    }
    if (!_postId || !_content || (!_postId && !_content)) {
        return res
            .status(401)
            .send({ error: "Provide all the required fields" });
    }
    const token = authorization.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, "MY_SECRET_KEY");
        const userId = decoded.userId;

        await prisma.comment.create({
            data: {
                content: _content,
                authorId: userId,
                postId: _postId,
            },
        });
        res.send(`Commented on post ${_postId} by user ${userId}`);
    } catch (err) {
        res.status(422).send({ error: err });
    }
});

module.exports = router;
