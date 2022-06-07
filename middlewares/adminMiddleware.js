
const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ error: "invalid token" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if(err) return res.status(403).json({ error: "Forbidden" });
        req.user = decoded
        return next()
    });
};

module.exports = verifyToken;