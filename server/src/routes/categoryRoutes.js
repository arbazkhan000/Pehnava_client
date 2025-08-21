import express from "express";
import categoryController from "../controller/categoryController.js";
import { authMiddleware, roleMiddleware } from "../middleware/middleware.js";
import { uploadCategoryImage } from "../middleware/uploadCategory.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    uploadCategoryImage,
    categoryController.createCategory
);

router.get("/", categoryController.getAllCategories);

export default router;
