const express = require("express");
const router = express.Router();
const prisma = require("../../utils/prisma");

router.get("/getPosts", async (req, res) => {
    try {
        const posts = await prisma.post.findMany({});
        res.status(200).send(posts);
    } catch (err) {
        console.log(err);
        res.status(422).send({ error: err });
    }
});

module.exports = router;
