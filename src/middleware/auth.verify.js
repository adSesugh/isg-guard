import jwt from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({
        success: false,
        message: 'Invalid Token'
    });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({
            success: false,
            message: "Access Forbidden"
        });

        req.user = user;

        next();
    });
};

export default verifyToken;