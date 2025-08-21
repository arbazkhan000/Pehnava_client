import React from "react";

const ProductDetailsTable = ({ product }) => {
    const details = [
        { label: "Fabric", value: product.fabric || "N/A" },
        {
            label: "Stretchability",
            value: product.stretchable ? "Stretchable" : "Not Stretchable",
        },
        { label: "Fit", value: product.fit || "N/A" },
        {
            label: "Quantity",
            value: product.quantity ? `Set of ${product.quantity}` : "N/A",
        },
        {
            label: "Belt",
            value:
                product.belt === "No"
                    ? "Does not come with Belt"
                    : product.belt,
        },
        { label: "Neckline", value: product.neckline || "N/A" },
        { label: "Sleeve Type", value: product.sleeveType || "N/A" },
        { label: "Sleeve Length", value: product.sleeveLength || "N/A" },
        { label: "Length", value: product.length || "N/A" },
        { label: "Style", value: product.style || "N/A" },
        { label: "Size", value: product.size || "N/A" },
    ];

    return (
        <div className="space-y-3 mt-6">
            <h3 className="text-lg font-semibold">Product Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6">
                {details.map((item, idx) => (
                    <div key={idx}>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <p className="font-medium text-gray-900">
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetailsTable;
