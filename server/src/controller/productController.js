// ✅ Final Cleaned & Focused Product Controller
import fs from "fs";
import path from "path";
import Category from "../schema/categorySchema.js";
import Product from "../schema/productSchema.js";

class ProductController {
    // ✅ Get All Products
    static async getAllProducts(req, res) {
        try {
            const products = await Product.find();
            res.status(200).json({
                success: true,
                message: "All products fetched successfully",

                data: products,
                count: products.length,
            });
        } catch (err) {
            console.error("Error in getAllProducts:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err.message,
            });
        }
    }

    // ✅ Create Product
    static async createProduct(req, res) {
        try {
            const {
                title,
                category,
                size,
                style,
                fabric,
                stretchable,
                fit,
                quantity,
                belt,
                neckline,
                sleeveType,
                sleeveLength,
                length,

                price,
            } = req.body;

            if (!req.files?.images?.length) {
                return res.status(400).json({
                    success: false,
                    message: "No image file uploaded",
                });
            }

            const images = (req.files.images || []).map(
                (file) => file.filename
            );

            const required = {
                title,
                category,
                size,
                style,
                fabric,
                stretchable,
                fit,
                quantity,
                belt,
                neckline,
                sleeveType,
                sleeveLength,
                length,

                price,
            };

            const missingFields = Object.entries(required)
                .filter(([_, v]) => v === undefined || v === "")
                .map(([k]) => k);

            if (missingFields.length) {
                return res.status(400).json({
                    success: false,
                    message: `Missing fields: ${missingFields.join(", ")}`,
                });
            }

            const product = await Product.create({
                title,
                images,
                category,
                size,
                style,
                fabric,
                stretchable,
                fit,
                quantity,
                belt,
                neckline,
                sleeveType,
                sleeveLength,
                length,

                price,
            });

            res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product,
            });
        } catch (err) {
            console.error("Error in createProduct:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err.message,
            });
        }
    }

    // ✅ Search Products
    static async searchProducts(req, res) {
        try {
            const search = req.query.search?.trim();
            if (!search) {
                return res.status(400).json({
                    success: false,
                    message: "Search query is missing",
                });
            }

            const products = await Product.find({
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { category: { $regex: search, $options: "i" } },
                    { style: { $regex: search, $options: "i" } },
                ],
            });

            if (products.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No products found",
                });
            }

            res.status(200).json({
                success: true,
                message: "Search results",
                data: products,
            });
        } catch (err) {
            console.error("Error in searchProducts:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    // ✅ Update Product
    static async updateProduct(req, res) {
        try {
            const { slug } = req.params;
            const updateFields = [
                "title",
                "category",
                "size",
                "style",
                "fabric",
                "stretchable",
                "fit",
                "quantity",
                "belt",
                "neckline",
                "sleeveType",
                "sleeveLength",
                "length",
                "price",
            ];

            const updateData = {};
            for (const field of updateFields) {
                if (req.body[field] !== undefined) {
                    updateData[field] = req.body[field];
                }
            }

            const existingProduct = await Product.findOne({ slug });
            if (!existingProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }

            if (req.files?.images?.length) {
                // Delete old images
                existingProduct.images?.forEach((img) => {
                    const imagePath = path.join("uploads/products", img);
                    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
                });
                updateData.images = req.files.images.map(
                    (file) => file.filename
                );
            }

            const updated = await Product.findOneAndUpdate(
                { slug },
                updateData,
                { new: true, runValidators: true }
            );

            res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: updated,
            });
        } catch (err) {
            console.error("Error in updateProduct:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err.message,
            });
        }
    }

    // ✅ Get Product by Slug
    static async getProductDetailsBySlug(req, res) {
        try {
            const { slug } = req.params;
            const product = await Product.findOne({ slug });
            if (!product) {
                return res
                    .status(404)
                    .json({ success: false, message: "Product not found" });
            }
            res.status(200).json({ success: true, data: product });
        } catch (err) {
            console.error("Error in getProductDetailsBySlug:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    // ✅ Delete Product by Slug
    static async deleteProductBySlug(req, res) {
        try {
            const { slug } = req.params;
            const product = await Product.findOne({ slug });
            if (!product)
                return res
                    .status(404)
                    .json({ success: false, message: "Product not found" });

            product.images?.forEach((img) => {
                const imgPath = path.join("uploads", img);
                if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
            });

            await Product.deleteOne({ slug });

            res.status(200).json({
                success: true,
                message: "Product deleted successfully",
            });
        } catch (err) {
            console.error("Error in deleteProductBySlug:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    // ✅ Show Category with Products
    static async getCategoriesWithProducts(req, res) {
        try {
            const categories = await Category.find();

            const result = await Promise.all(
                categories.map(async (cat) => {
                    const products = await Product.find({ category: cat._id }); // fix here
                    return {
                        category: {
                            name: cat.name,
                            slug: cat.slug,
                            image: cat.categoryImage,
                            description: cat.description || "",
                        },
                        products,
                    };
                })
            );

            res.status(200).json({
                success: true,
                message: "Categories with products fetched successfully",
                data: result,
            });
        } catch (err) {
            console.error("Error in getCategoriesWithProducts:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err.message,
            });
        }
    }

    // done
    static async getProductsByCategory(req, res) {
        try {
            const { slug } = req.params; // category slug from URL
            const page = parseInt(req.query.page) || 1; // default page = 1
            const limit = 10; // 10 products per page
            const skip = (page - 1) * limit;

            // Find category by slug
            const category = await Category.findOne({ slug });
            if (!category) {
                return res
                    .status(404)
                    .json({ success: false, message: "Category not found" });
            }

            // Get products in this category
            const products = await Product.find({ category: category.name })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });

            // Count total products in this category
            const totalProducts = await Product.countDocuments({
                category: category.name,
            });

            res.json({
                success: true,
                category: category.name,
                message: "Products fetched successfully",
                page,
                totalPages: Math.ceil(totalProducts / limit),
                totalProducts,
                products,
            });
        } catch (err) {
            console.error("Error fetching products by category:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal Server error",
                error: err.message,
            });
        }
    }

    // done
    static async getHomepageData(req, res) {
        try {
            // Get all categories
            const categories = await Category.find().sort({ createdAt: -1 });

            if (!categories) {
                return res.send(400).json({
                    success: false,
                    message: "Home Page categories not found",
                });
            }

            // For each category, get the first 4 products
            const categoryData = await Promise.all(
                categories.map(async (cat) => {
                    const products = await Product.find({
                        category: cat.name,
                    })
                        .sort({ createdAt: -1 })
                        .limit(4);

                    return {
                        _id: cat._id,
                        name: cat.name,
                        slug: cat.slug,
                        categoryImage: cat.categoryImage,
                        products,
                    };
                })
            );

            res.json({
                success: true,
                message: "Products fetch successfully",
                categories: categoryData,
            });
        } catch (err) {
            console.error("Error fetching homepage data:", err.message);
            res.status(500).json({
                success: false,
                error: err.message,
                message: "Internal Server error",
            });
        }
    }
}

export default ProductController;
