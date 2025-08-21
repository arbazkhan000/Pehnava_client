import { useProduct } from "@/context/ProductContext";
import { useState } from "react";
import { toast } from "sonner";

const initialFormData = {
    title: "",
    images: [],
    category: "",
    size: "",
    style: "",
    fabric: "",
    stretchable: false,
    fit: "",
    quantity: 0,
    belt: "No",
    neckline: "None",
    sleeveType: "None",
    sleeveLength: "None",
    length: "Mini",
    price: 0,
};

const Add = () => {
    const { createProduct, loading } = useProduct();
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({ ...prev, images: files }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "images") {
                value.forEach((file) => data.append("images", file));
            } else {
                data.append(key, value);
            }
        });

        try {
            const res = await createProduct(data);

            if (res.success) {
                toast({
                    title: "Success",
                    description: "Product created successfully",
                    variant: "success",
                });
                setFormData(initialFormData);
            } else {
                throw new Error(res.message || "Failed to create product");
            }
        } catch (err) {
            toast({
                title: "Error",
                description: err.message || "Failed to create product",
                variant: "destructive",
            });
            console.error(err);
        }
    };

    const inputClass =
        "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3";

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
                encType="multipart/form-data"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Images
                            </label>
                            <input
                                type="file"
                                name="images"
                                multiple
                                onChange={handleImageUpload}
                                className={`${inputClass} file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100`}
                                required
                            />
                            {formData.images.length > 0 && (
                                <p className="mt-2 text-xs text-gray-500">
                                    {formData.images.length} file(s) selected
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            >
                                <option value="">Select category</option>
                                {[
                                    "Dresses",
                                    "Tops",
                                    "Kurtas-Set",
                                    "Chikankari",
                                    "Short-Kurta",
                                    "Shirt",
                                    "Co-ord Set",
                                ].map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Size */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Size
                            </label>
                            <select
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            >
                                <option value="">Select size</option>
                                {["XS", "S", "M", "L", "XL", "2XL", "XXL"].map(
                                    (size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        {/* Style */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Style
                            </label>
                            <select
                                name="style"
                                value={formData.style}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            >
                                <option value="">Select style</option>
                                {[
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
                                ].map((style) => (
                                    <option key={style} value={style}>
                                        {style}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Fabric */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Fabric
                            </label>
                            <input
                                type="text"
                                name="fabric"
                                value={formData.fabric}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            />
                        </div>

                        {/* Stretchable */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="stretchable"
                                checked={formData.stretchable}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">
                                Stretchable
                            </label>
                        </div>

                        {/* Fit */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Fit
                            </label>
                            <select
                                name="fit"
                                value={formData.fit}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            >
                                <option value="">Select fit</option>
                                {["Regular", "Slim", "Loose"].map((fit) => (
                                    <option key={fit} value={fit}>
                                        {fit}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Additional Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            label: "Quantity",
                            name: "quantity",
                            type: "number",
                            min: 0,
                        },
                        {
                            label: "Price",
                            name: "price",
                            type: "number",
                            min: 0,
                            step: 0.01,
                        },
                        {
                            label: "Belt",
                            name: "belt",
                            type: "select",
                            options: ["No", "Yes"],
                        },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            {field.type === "select" ? (
                                <select
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                >
                                    {field.options.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    min={field.min}
                                    step={field.step}
                                    required
                                    className={inputClass}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Sleeve & Length */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        {
                            label: "Neckline",
                            name: "neckline",
                            options: ["None", "Round", "V-neck", "Polo"],
                        },
                        {
                            label: "Sleeve Type",
                            name: "sleeveType",
                            options: ["None", "Short", "Long", "Cap"],
                        },
                        {
                            label: "Sleeve Length",
                            name: "sleeveLength",
                            options: ["None", "Short", "3/4", "Full"],
                        },
                        {
                            label: "Length",
                            name: "length",
                            options: ["Mini", "Knee", "Midi", "Maxi"],
                        },
                    ].map((field) => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            <select
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            >
                                {field.options.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                <div className="pt-4">
                    <button
                        disabled={loading}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? "Please wait..." : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add;
