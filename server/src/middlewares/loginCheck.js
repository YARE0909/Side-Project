const jwt = require("jsonwebtoken");
const prisma = require("../../utils/prisma");

module.exports = async (req, res, next) => {
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
        req.user = user;
        next();
    } catch (err) {
        res.status(422).send({ error: err });
    }
};
