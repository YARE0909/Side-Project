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
            },
        });
        res.status(200).send(posts);
    } catch (err) {
        console.log(err);
        res.status(422).send({ error: err });
    }
});

router.get("/test", loginCheck, async (req, res) => {
    const user = req.user;
    res.send(user.userName);
});

export default router;
