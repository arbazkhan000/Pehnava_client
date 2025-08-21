import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";


const categoryDir = "uploads/categories";

if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
}

const categoryStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, categoryDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
        const unique = `${base}-${Date.now()}-${crypto
            .randomBytes(2)
            .toString("hex")}${ext}`;
        cb(null, unique);
    },
});

const fileFilter = (req, file, cb) => {
       const allowedTypes = [
           "image/jpeg",
           "image/png",
           "image/jpg",
           "image/webp",
           ,
       ];

   if (allowedTypes.includes(file.mimetype)) {
       cb(null, true);
   } else {
       cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
   }
};

export const uploadCategoryImage = multer({
    storage: categoryStorage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },
}).single("categoryImage"); 
