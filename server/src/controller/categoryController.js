import Category from "../schema/categorySchema.js";

class categoryController {
    static async createCategory(req, res) {
        
        try {
            const { name, description } = req.body;

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Category image is required",
                });
            }

            const existing = await Category.findOne({ name });
            if (existing) {
                return res.status(400).json({
                    success: false,
                    message: "Category already exists",
                });
            }

            const categoryImage = `/uploads/categories/${req.file.filename}`;

            const newCategory = await Category.create({
                name,
                description,
                categoryImage,
            });

            res.status(201).json({
                success: true,
                message: "Category created successfully",
                category: newCategory,
            });
        } catch (err) {
            console.error("Error creating category:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err.message,
            });
        }
    }

    static async getAllCategories(req, res) {
        try {


            const categories = await Category.find().sort({ createdAt: -1 });
            res.status(200).json({
                success: true,
                count: categories.length,
                categories,
            });
        } catch (err) {
            console.error("Error fetching categories:", err.message);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err.message,
            });
        }
    }
}

export default categoryController;
