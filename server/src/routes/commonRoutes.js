const express = require("express");
const router = express.Router();
const prisma = require("../../utils/prisma");

router.get("/getPosts", async (req, res) => {
    try {
        const posts = await prisma.post.findMany({});
        res.status(200).send(posts);
    } catch (err) {
        res.status(422).send({ error: err });
    }
});

router.delete("/delete", async (req, res) => {
    const {id: _id} = req.query;
    try {
        await prisma.post.delete({
            where: {
                id: _id
            }
        })
        res.status(200).send(`Post ${_id} deleted`);
    }catch(err){
        res.status(422).send({ error: err });
    }
})

module.exports = router;
