import { useProduct } from "@/context/ProductContext";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import DetailsDropdown from "./DetailsDropdown";

const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
};

const ProductDetails = () => {
    const { slug } = useParams();
    const { products } = useProduct();

    const [selectedSize, setSelectedSize] = useState(null);
    const [mainImage, setMainImage] = useState(0);

    const product = useMemo(
        () =>
            products.find((p) => p.slug?.toLowerCase() === slug?.toLowerCase()),
        [slug, products]
    );

    const similarProducts = useMemo(() => {
        if (!product) return [];
        return products
            .filter((p) => p.category === product.category && p.slug !== slug)
            .slice(0, 4);
    }, [product, slug, products]);

    const handleImageError = (e) => {
        e.target.src = "/fallback.jpg";
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-center text-xl font-semibold text-gray-600">
                Product not found.
            </div>
        );
    }

    return (
        <>
            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                >
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-sm">
                            <img
                                src={
                                    product.images?.[mainImage] || product.image
                                }
                                alt={product.title}
                                className="w-full h-full object-cover transition-opacity duration-300"
                                onError={handleImageError}
                            />
                            {product.isNew && (
                                <span className="absolute top-4 left-4  text-foreground font-medium px-3 py-1 rounded-full text-xs shadow-sm">
                                    New Arrival
                                </span>
                            )}
                        </div>
                        {product.images?.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setMainImage(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border transition-all ${
                                            mainImage === index
                                                ? "border-foreground ring-2 ring-foreground/20"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.title} thumbnail ${index}`}
                                            className="w-full h-full object-cover"
                                            onError={handleImageError}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6 text-foreground">
                        <div>
                            <h1 className="text-3xl font-bold ">
                                {product.title}
                            </h1>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-brand">
                                    {formatPrice(product.newPrice)}
                                </span>
                                {product.oldPrice && (
                                    <span className="text-gray-400 text-base line-through ml-3">
                                        {formatPrice(product.oldPrice)}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Size Selection */}
                        {product.sizes?.length > 0 && (
                            <div className="pt-2">
                                <h4 className="text-sm font-medium text-foreground mb-3">
                                    Select Size
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            className={`w-12 h-10 flex items-center justify-center border-2 rounded-lg transition-all font-medium ${
                                                selectedSize === size
                                                    ? "bg-foreground text-background border-foreground"
                                                    : "text-foreground  hover:border-brand hover:text-foreground"
                                            }`}
                                            onClick={() =>
                                                setSelectedSize(size)
                                            }
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button className="px-6 py-3.5 bg-foreground hover:bg-brand-dark text-background rounded-xl font-medium flex-1 transition-colors ">
                                Add to Cart
                            </button>
                            <button className="px-6 py-3.5  text-foreground rounded-xl font-medium flex-1 transition-colors border-foreground hover:text-foreground hover:bg-background ">
                                Buy Now
                            </button>
                        </div>

                        {/* Product Details Accordions */}
                        <div className="space-y-3 mt-6">
                            <DetailsDropdown
                                title="Product Details"
                                content={
                                    product.fullDescription ||
                                    "Detailed description of the product goes here."
                                }
                            />
                            <DetailsDropdown
                                title="Size & Fit"
                                content={
                                    product.sizeGuide ||
                                    "Available sizes: S, M, L, XL. Please refer to the size chart for measurements."
                                }
                            />
                            <DetailsDropdown
                                title="Material & Care"
                                content={
                                    product.careInstructions ||
                                    "Machine wash cold, gentle cycle. Tumble dry low or air dry."
                                }
                            />
                            <DetailsDropdown
                                title="Shipping & Returns"
                                content="Free shipping on orders over $50. Returns accepted within 30 days."
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Similar Products */}
                {similarProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            You may also like
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {similarProducts.map((prod) => (
                                <ProductCard key={prod.id} product={prod} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductDetails;
