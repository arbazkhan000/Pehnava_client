import rateLimit from "express-rate-limit";

// Create a limiter for login & register
export const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // limit each IP to 5 requests per window
    message: {
        success: false,
        message: "Too many attempts, please try again after 10 minutes",
    },
    standardHeaders: true, // return rate limit info in headers
    legacyHeaders: false, // disable X-RateLimit-* headers
});
