import { products } from "@/data/mockData";
import { AnimatePresence, motion } from "framer-motion";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Minus,
    Plus,
    RotateCcw,
    Shield,
    ShoppingCart,
    Truck,
    Zap,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductsDetails = () => {
    const { slug } = useParams();

    const filterProduct = products.find((p) => p.slug == slug);
    // Get similar products (excluding current product) Limit to 4 similar products
    const similarProducts = products
        .filter((p) => p.category === filterProduct.category && p.slug !== slug)
        .slice(0, 4);

    const [openIndex, setOpenIndex] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const accordionData = [
        {
            title: "Product Details",
            icon: <Shield className="w-4 h-4" />,
            content:
                filterProduct.description ||
                "Premium quality product with exceptional features and build quality.",
        },
        {
            title: "Delivery & Payment",
            icon: <Truck className="w-4 h-4" />,
            content:
                "Free express delivery in 2-3 days. Multiple payment options including COD, cards, and digital wallets.",
        },
        {
            title: "Returns & Warranty",
            icon: <RotateCcw className="w-4 h-4" />,
            content:
                "30-day easy returns with full refund. 2-year manufacturer warranty included with every purchase.",
        },
    ];

    const handleQuantityChange = (value) => {
        const newQuantity = quantity + value;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const nextImage = () => {
        setSelectedImageIndex((prev) =>
            prev === filterProduct.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? filterProduct.images.length - 1 : prev - 1
        );
    };

    return (
        <>
            <motion.div
                className="min-h-screen bg-brand-background py-4 sm:py-6 lg:py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="mb-4 sm:mb-6 lg:mb-8">
                        <div className="flex items-center space-x-2 text-sm text-brand">
                            <span>Home</span>
                            <ChevronRight className="w-4 h-4" />
                            <span>Products</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-brand font-medium truncate">
                                {filterProduct.title}
                            </span>
                        </div>
                    </nav>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
                        {/* Image Gallery - Mobile Optimized */}
                        <div className="w-full">
                            <div className="space-y-4">
                                {/* Main Image */}
                                <motion.div
                                    className="relative aspect-square bg-brand-background rounded-2xl shadow-lg overflow-hidden"
                                    layoutId={`product-image-${filterProduct.id}`}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={selectedImageIndex}
                                            src={
                                                filterProduct.images[
                                                    selectedImageIndex
                                                ]
                                            }
                                            alt={`${
                                                filterProduct.title
                                            } - Image ${
                                                selectedImageIndex + 1
                                            }`}
                                            className="w-full h-full object-contain  sm:p-6 lg:p-8"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </AnimatePresence>

                                    {/* Navigation Buttons - Hidden on mobile, shown on hover on desktop */}
                                    <div className="absolute inset-0 flex items-center justify-between p-2 sm:p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <motion.button
                                            onClick={prevImage}
                                            className="pointer-events-auto bg-white/90 backdrop-blur-sm hover:bg-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </motion.button>
                                        <motion.button
                                            onClick={nextImage}
                                            className="pointer-events-auto bg-white/90 backdrop-blur-sm hover:bg-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label="Next image"
                                        >
                                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </motion.button>
                                    </div>

                                    {/* Image Counter */}
                                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-black/70 backdrop-blur-sm text-white text-xs sm:text-sm px-3 py-1 rounded-full">
                                            {selectedImageIndex + 1} /{" "}
                                            {filterProduct.images.length}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Thumbnail Grid  */}
                                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                                    {filterProduct.images.map((img, index) => (
                                        <motion.button
                                            key={index}
                                            className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 ${
                                                index === selectedImageIndex
                                                    ? " border-2 border-brand  scale-105"
                                                    : "hover:scale-105 hover:shadow-md"
                                            }`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() =>
                                                setSelectedImageIndex(index)
                                            }
                                            aria-label={`View image ${
                                                index + 1
                                            }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`${
                                                    filterProduct.title
                                                } thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            {index === selectedImageIndex && (
                                                <motion.div
                                                    className="absolute inset-0 bg-red-500/20"
                                                    layoutId="selected-thumbnail"
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Info  */}
                        <div className="space-y-6 lg:space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-4"
                            >
                                <motion.h1
                                    className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-brand leading-tight"
                                    layoutId={`product-title-${filterProduct.id}`}
                                >
                                    {filterProduct.title}
                                </motion.h1>

                                {/* Price Section */}
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand">
                                        ₹
                                        {filterProduct.newPrice.toLocaleString()}
                                    </span>
                                    {filterProduct.oldPrice && (
                                        <span className="text-lg sm:text-xl text-gray-400 line-through">
                                            ₹
                                            {filterProduct.oldPrice.toLocaleString()}
                                        </span>
                                    )}
                                    {filterProduct.discount && (
                                        <motion.span
                                            className="bg-brand text-brand-background text-sm font-semibold px-3 py-1 rounded-full"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {filterProduct.discount} OFF
                                        </motion.span>
                                    )}
                                </div>

                                <p className="text-sm text-brand">
                                    Inclusive of all taxes • Free shipping on
                                    orders above ₹999
                                </p>
                            </motion.div>

                            {/* Quantity Selector */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-3"
                            >
                                <label className="block text-sm font-medium text-brand">
                                    Quantity
                                </label>
                                <div className="flex items-center">
                                    <div className="flex items-center border-2 border-brand rounded-xl overflow-hidden">
                                        <motion.button
                                            onClick={() =>
                                                handleQuantityChange(-1)
                                            }
                                            className="p-3 hover:text-brand transition-colors disabled:opacity-50"
                                            disabled={quantity <= 1}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </motion.button>
                                        <span className="px-4 py-3 text-lg font-semibold min-w-[3rem] text-center">
                                            {quantity}
                                        </span>
                                        <motion.button
                                            onClick={() =>
                                                handleQuantityChange(1)
                                            }
                                            className="p-3 hover:text-brand transition-colors disabled:opacity-50"
                                            disabled={quantity >= 10}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                            >
                                <motion.button
                                    className="flex-1 bg-brand text-brand-background py-3 sm:py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </motion.button>
                                <motion.button
                                    className="flex-1 bg-brand text-brand-background py-3 sm:py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Zap className="w-5 h-5" />
                                    Buy Now
                                </motion.button>
                            </motion.div>

                            {/* Product Information Accordion */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="border-t border-gray-200 pt-6 lg:pt-8"
                            >
                                <div className="space-y-1">
                                    {accordionData.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="border border-gray-200 rounded-xl overflow-hidden"
                                        >
                                            <motion.button
                                                className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                                                onClick={() =>
                                                    setOpenIndex(
                                                        openIndex === idx
                                                            ? null
                                                            : idx
                                                    )
                                                }
                                                aria-expanded={
                                                    openIndex === idx
                                                }
                                                whileHover={{
                                                    backgroundColor:
                                                        "rgb(249, 250, 251)",
                                                }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="text-gray-500">
                                                        {item.icon}
                                                    </div>
                                                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                                                        {item.title}
                                                    </span>
                                                </div>
                                                <motion.div
                                                    animate={{
                                                        rotate:
                                                            openIndex === idx
                                                                ? 180
                                                                : 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: "easeInOut",
                                                    }}
                                                >
                                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                                </motion.div>
                                            </motion.button>

                                            <AnimatePresence>
                                                {openIndex === idx && (
                                                    <motion.div
                                                        initial={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            height: "auto",
                                                            opacity: 1,
                                                        }}
                                                        exit={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                            ease: "easeInOut",
                                                        }}
                                                        className="overflow-hidden bg-gray-50"
                                                    >
                                                        <div className="p-4 sm:p-5 text-gray-600 text-sm sm:text-base leading-relaxed">
                                                            {item.content}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/*  related products         */}

            {similarProducts.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand mb-8">
                        You might also like...
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {similarProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductsDetails;
