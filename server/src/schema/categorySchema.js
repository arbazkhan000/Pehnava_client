import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        categoryImage: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Create slug before saving
categorySchema.pre("save", function (next) {
    if (!this.slug) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
