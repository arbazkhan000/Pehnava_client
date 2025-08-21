import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;


    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "No token provided or invalid format",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
        next();
    } catch (err) {
        console.error("Token verification failed:", err.message);
        if (err.name === "TokenExpiredError") {
            return res
                .status(401)
                .json({ success: false, message: "Token expired" });
        }
        res.status(401).json({ success: false, message: "Token is not valid" });
    }
};

const roleMiddleware = (role) => (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized, no user found in request",
        });
    }

    if (req.user.role !== role) {
        return res.status(403).json({
            success: false,
            message: `Access denied, ${role} only`,
        });
    }

    next();
};

export { authMiddleware, roleMiddleware };
