const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["X-Access-Token"] || req.headers['Authorization'];

    if (!token) {
        return res.status(403).send("Missing token");
    }
    try {
        const decoded = jwt.verify(token, config.SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

export default verifyToken;