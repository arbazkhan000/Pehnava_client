import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useProduct } from "@/context/ProductContext";
import toast from "react-hot-toast";
import { addToCart } from "../../redux/cartSlice";
import ProductCard from "./ProductCard";
import ProductDetailsTable from "./ProductDetailsTable";

const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);

const ProductDetails = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const { products, getProductsDetails, loading, isAuthenticated } =
        useProduct();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);

    const backendBaseURL = import.meta.env.VITE_BACKEND_URL;
    const IMAGE_BASE_URL = `${backendBaseURL}/uploads/products/`;

    // Fetch products if not already loaded
    useEffect(() => {
        if (products.length === 0) getProductsDetails();
    }, [products.length, getProductsDetails]);

    // Set current product when slug or products change
    useEffect(() => {
        if (products.length > 0 && slug) {
            const found = products.find(
                (p) => p.slug?.toLowerCase() === slug?.toLowerCase()
            );
            setProduct(found || null);
            setMainImage(0);
            setSelectedSize(null);
        }
    }, [slug, products]);

    if (loading) return <LoadingSpinner fullScreen />;
    if (!product)
        return (
            <div className="min-h-screen flex items-center justify-center text-center text-xl font-semibold text-gray-600">
                Product not found.
            </div>
        );

    const similarProducts = products
        .filter((p) => {
            const sameCategory =
                typeof p.category === "object"
                    ? p.category?._id === product.category?._id
                    : p.category?.toLowerCase() ===
                      product.category?.toLowerCase();

            return (
                sameCategory && p.slug?.toLowerCase() !== slug?.toLowerCase()
            );
        })
        .slice(0, 4);

    // Handle add to cart
    const handleAddToCart = () => {
        dispatch(addToCart(product));
        toast.success("Product added to cart successfully!");
    };
    // Handle Buy Now
    const handleBuyNow = () => {
        if (!isAuthenticated) {
            toast.error("Please login first to buy products!");
            navigate("/login");
            return;
        }
        // Add to cart first or navigate to checkout
        dispatch(addToCart(product));
        navigate("/checkout");
    };

    const handleImageError = (e) => (e.currentTarget.src = "/fallback.jpg");

    return (
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
                            src={`${IMAGE_BASE_URL}${
                                product.images?.[mainImage] ?? "fallback.jpg"
                            }`}
                            alt={product.title || "Product Image"}
                            onError={handleImageError}
                            className="w-full h-full object-cover"
                        />
                        {product.isNew && (
                            <span className="absolute top-4 left-4 text-foreground font-medium px-3 py-1 rounded-full text-xs shadow-sm">
                                New Arrival
                            </span>
                        )}
                    </div>

                    {product.images?.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImage(i)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border transition-all ${
                                        mainImage === i
                                            ? "border-foreground ring-2 ring-foreground/20"
                                            : "border-gray-200 hover:border-gray-300"
                                    }`}
                                    aria-label={`View image ${i + 1}`}
                                >
                                    <img
                                        src={`${IMAGE_BASE_URL}${img}`}
                                        alt={`${product.title} thumbnail ${i}`}
                                        onError={handleImageError}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-6 text-foreground">
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-gray-600 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-brand">
                            {formatPrice(product.price)}
                        </span>
                        {product.oldPrice && (
                            <span className="text-gray-400 text-base line-through">
                                {formatPrice(product.oldPrice)}
                            </span>
                        )}
                    </div>

                    {/* Size Selection */}
                    {product.sizes?.length > 0 && (
                        <div className="pt-2">
                            <h4 className="text-sm font-medium mb-3">
                                Select Size
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-10 flex items-center justify-center border-2 rounded-lg font-medium transition-all ${
                                            selectedSize === size
                                                ? "bg-foreground text-background border-foreground"
                                                : "text-foreground hover:border-brand hover:text-foreground"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleAddToCart}
                            className="px-6 py-3.5 bg-foreground text-background rounded-xl font-medium flex-1 transition-colors"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="px-6 py-3.5 hover:border-foreground text-foreground rounded-xl font-medium flex-1 transition-colors  hover:text-foreground hover:bg-background"
                        >
                            Buy Now
                        </button>
                    </div>

                    {/* Product Table */}
                    <div className="space-y-3 mt-6">
                        <ProductDetailsTable product={product} />
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
                        {similarProducts.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
