import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const secretKey = process.env.JWT_SECRET_KEY || '';
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = decoded;
            return next();
        });
    }
    else {
        res.sendStatus(401); // Unauthorized
    }
};
