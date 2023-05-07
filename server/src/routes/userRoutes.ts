import express from "express";
const router = express.Router();
import prisma from "../utils/prisma";
import loginCheck from "../middlewares/loginCheck";
import { PrismaDeleteError } from "../interfaces/prismaErrors"; 

router.get("/profile", loginCheck, async (req, res) => {
    const user = req.user;
    try {
        res.send({ email: user.email, userName: user.userName });
    } catch (err) {
        res.status(422).send({ error: err });
    }
});

router.post("/post", loginCheck, async (req, res) => {
    const user = req.user;
    const { title: _title, content: _content } = req.body;
    if (!_title || !_content || (!_title && !_content)) {
        return res
            .status(401)
            .send({ error: "Provide all the required fields" });
    }
    try {
        await prisma.getInstance().post.create({
            data: {
                title: _title,
                content: _content,
                authorId: String(user.id),
                
            },
        });
        res.status(200).send("Post created successfully!");
    } catch (err) {
        console.log(err)
        res.status(422).send({ error: err });
    }
});

router.delete("/post/delete", loginCheck, async (req, res) => {
    const { id: _id } = req.query;
    if (!_id) {
        return res.status(401).send({ error: "Provide a post ID" });
    }
    try {
        await prisma.getInstance().post.delete({
            where: {
                id: _id,
            },
        });
        res.status(200).send(`Post ${_id} deleted`);
    } catch (err) {
        res.status(422).send({ error: (err as PrismaDeleteError).meta.cause });
    }
});

router.delete("/comment/delete", loginCheck, async (req, res) => {
    const { id: _id } = req.query;
    if (!_id) {
        return res.status(401).send({ error: "Provide a comment ID" });
    }
    try {
        await prisma.getInstance().comment.delete({
            where: {
                id: _id,
            },
        });
        res.status(200).send(`Comment ${_id} deleted`);
    } catch (err) {
        res.status(422).send({ error: (err as PrismaDeleteError).meta.cause });
    }
});

router.get("/getUserPosts", loginCheck, async (req, res) => {
    const user = req.user;
    try {
        const posts = await prisma.getInstance().post.findMany({
            where: {
                authorId: String(user.id),
            },
        });
        res.status(200).send(posts);
    } catch (err) {
        res.status(422).send({ error: err });
    }
});

router.post("/post/like", loginCheck, async (req, res) => {
    const user = req.user;
    const { postId: _postId } = req.body;
    if (!_postId) {
        return res.status(401).send({ error: "Provide a post ID" });
    }
    try {
        const check = await prisma.getInstance().like.findMany({
            where: {
                userId: user.id,
                postId: _postId,
            },
        });
        if (check.length !== 0) {
            await prisma.getInstance().like.delete({
                where: {
                    id: check[0].id,
                },
            });
            return res.send("Post unliked");
        }
        await prisma.getInstance().like.create({
            data: {
                userId: user.id,
                postId: _postId,
            },
        });
        res.send(`Post ${_postId} liked`);
    } catch (err) {
        res.status(422).send({ error: err });
    }
});
router.post("/comment/like", loginCheck, async (req, res) => {
    const user = req.user;
    const { commentId: _commentId } = req.body;
    if (!_commentId) {
        return res.status(401).send({ error: "Provide a comment ID" });
    }
    try {
        const check = await prisma.getInstance().like.findMany({
            where: {
                userId: user.id,
                commentId: _commentId,
            },
        });
        if (check.length !== 0) {
            await prisma.getInstance().like.delete({
                where: {
                    id: check[0].id,
                },
            });
            return res.send("Comment unliked");
        }
        await prisma.getInstance().like.create({
            data: {
                userId: user.id,
                commentId: _commentId,
            },
        });
        res.send(`Comment ${_commentId} liked`);
    } catch (err) {
        console.log(err);
        res.status(422).send({ error: err });
    }
});

router.post("/post/comment", loginCheck, async (req, res) => {
    const user = req.user;
    const { postId: _postId, content: _content } = req.body;
    if (!_postId || !_content || (!_postId && !_content)) {
        return res
            .status(401)
            .send({ error: "Provide all the required fields" });
    }
    try {
        await prisma.getInstance().comment.create({
            data: {
                content: _content,
                authorId: user.id,
                postId: _postId,
            },
        });
        res.send(`Commented on post ${_postId} by user ${user.id}`);
    } catch (err) {
        res.status(422).send({ error: err });
    }
});

export default router;
