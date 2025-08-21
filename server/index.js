import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import path from "path";

// Load environment variables
dotenv.config();

const app = express();
const __dirname = path.resolve();

// CORS Configuration - Do this once at the top
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
        exposedHeaders: ["Content-Disposition"],
    })
);

// Security Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files - Simplified version
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"), {
        setHeaders: (res) => {
            res.set("Cross-Origin-Resource-Policy", "cross-origin");
        },
    })
);

// Connect MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log(" Database connected successfully");
    } catch (err) {
        console.error(" Database connection failed:", err);
        process.exit(1);
    }
};
connectDB();

// Routes
import categoryRoutes from "./src/routes/categoryRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", userRoutes);

// Health Check
app.get("/", (req, res) => {
    res.send("🚀 Pehnava API is running...");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Something went wrong!" });
});

// Request Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
