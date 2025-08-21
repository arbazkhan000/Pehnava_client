import express from "express";
import productController from "../controller/productController.js";
import { authMiddleware, roleMiddleware } from "../middleware/middleware.js";
import { uploadProductImage } from "../middleware/uploadProduct.js";
import { authLimiter } from "../../utils/rateLimit.js";

const router = express.Router();

// Public Routes
router.get("/", productController.getAllProducts);
router.get("/category/:slug", productController.getProductsByCategory);
router.get("/home", productController.getHomepageData);
router.get("/with-products", productController.getCategoriesWithProducts);
router.get("/search", productController.searchProducts);
router.get("/:slug", productController.getProductDetailsBySlug);

// Admin Routes
router.post(
    "/",
    authLimiter,
    authMiddleware,

    roleMiddleware("admin"),
    uploadProductImage,
    productController.createProduct
);
router.put(
    "/:slug",
    authMiddleware,
    roleMiddleware("admin"),
    uploadProductImage,
    productController.updateProduct
);
router.delete(
    "/:slug",
    authLimiter,
    authMiddleware,
    roleMiddleware("admin"),
    productController.deleteProductBySlug
);

export default router;
