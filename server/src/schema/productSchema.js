import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        images: {
            type: [String],
            required: [true, "Images are required"],
            min: 0,
            max: 5,
        },
        category: {
            type: String,
            enum: [
                "Dresses",
                "Tops",
                "Kurtas-Set",
                "chikenkari",
                "Short-Kurta",
                "Shirt",
                "Co-ord Set",
            ],
            required: true,
        },
        size: {
            type: String,
            enum: ["XS", "S", "M", "L", "XL", "2XL", "XXL"],
            required: true,
        },
        style: {
            type: String,
            enum: [
                "Casual",
                "Elegant",
                "Minimalist",
                "Sweet",
                "French",
                "Vacation",
                "Relaxed",
                "Sexy",
                "Korean",
                "Street",
                "Artsy",
                "Retro",
                "Y2K",
            ],
            required: true,
        },
        fabric: {
            type: String,
            required: true,
        },
        stretchable: {
            type: Boolean,
            default: false,
        },
        fit: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        belt: {
            type: String,
            enum: ["Yes", "No"],
            default: "No",
        },
        neckline: {
            type: String,
            required: true,
        },
        sleeveType: {
            type: String,
            required: true,
        },
        sleeveLength: {
            type: String,
            required: true,
        },
        length: {
            type: String,
            required: true,
        },
        
        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
);

//  generate slug from title
productSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

productSchema.virtual("stockStatus").get(function () {
    return this.quantity > 0 ? "In Stock" : "Out of Stock";
});

export default mongoose.model("Product", productSchema);
