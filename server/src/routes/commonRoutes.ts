import express from "express";
const router = express.Router();
import prisma from "../utils/prisma";
import loginCheck from "../middlewares/loginCheck";

router.get("/getPosts", async (req, res) => {
    try {
        const posts = await prisma.getInstance().post.findMany({
            include: {
                author: {
                    select: {
                        userName: true,
                        displayName: true,
                    },
                },
                likes: true,
            },
        });
        res.status(200).send(posts);
    } catch (err) {
        res.status(422).send({ error: err });
    }
});

router.get("/post/likeCount", async (req, res) => {
    const { postId: _id } = req.query;
    if (!_id) {
        return res.status(401).send({ error: "Provide a post ID" });
    }
    try {
        const response = await prisma.getInstance().like.findMany({
            where: {
                postId: _id,
            },
        });
        res.status(200).send(response);
    } catch (err) {
        res.status(422).send({ error: err });
    }
});

export default router;
