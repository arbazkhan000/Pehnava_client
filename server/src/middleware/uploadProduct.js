import crypto from "crypto";
import fs from "fs";
import multer from "multer";
import path from "path";

const productDir = "uploads/products";

if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, productDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const random = crypto.randomBytes(2).toString("hex");
        cb(null, `product-${Date.now()}-${random}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
    }
};

export const uploadProductImage = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
}).fields([{ name: "images", maxCount: 5 }]);

