const express = require("express");
const router = express.Router();
const prisma = require("../../utils/prisma");
const loginCheck = require("../middlewares/loginCheck");

router.get("/getPosts", async (req, res) => {
    try {
        const posts = await prisma.post.findMany({});
        res.status(200).send(posts);
    } catch (err) {
        res.status(422).send({ error: err });
    }
});

router.get("/test", loginCheck, async (req, res) => {
    const user = req.user;
    res.send(user.userName);
});

module.exports = router;
