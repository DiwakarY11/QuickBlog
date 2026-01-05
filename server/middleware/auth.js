import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    try {
        // Example logic: Extract token from headers
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Verify token (Replace 'your_jwt_secret' with your actual secret key)
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        req.user = decoded;
        
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};
export default auth;    