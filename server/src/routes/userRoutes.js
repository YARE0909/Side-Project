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

module.exports = router;
