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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductDetails = () => {
    const { slug } = useParams();

      useEffect(() => {
          window.scrollTo(0, 0);
      }, []);

    // Find the product based on slug param
    const product = products.find((p) => p.slug === slug);

    // Show message if product not found
    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-semibold">
                Product not found.
            </div>
        );
    }

    // Get similar products from same category excluding current
    const similarProducts = products
        .filter((p) => p.category === product.category && p.slug !== slug)
        .slice(0, 4);

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [openIndex, setOpenIndex] = useState(null);

    const accordionData = [
        {
            title: "Product Details",
            icon: <Shield className="w-4 h-4" />,
            content:
                product.description ||
                "Premium quality product with great features.",
        },
        {
            title: "Delivery & Payment",
            icon: <Truck className="w-4 h-4" />,
            content:
                "Free express delivery in 2-3 days. Multiple payment options including COD and cards.",
        },
        {
            title: "Returns & Warranty",
            icon: <RotateCcw className="w-4 h-4" />,
            content:
                "30-day easy returns. 2-year manufacturer warranty included.",
        },
    ];

    // Quantity change handler with limits
    const changeQuantity = (amount) => {
        setQuantity((qty) => {
            const newQty = qty + amount;
            if (newQty < 1) return 1;
            if (newQty > 10) return 10;
            return newQty;
        });
    };

    // Navigate images
    const nextImage = () =>
        setSelectedImageIndex((i) =>
            i === product.images.length - 1 ? 0 : i + 1
        );
    const prevImage = () =>
        setSelectedImageIndex((i) =>
            i === 0 ? product.images.length - 1 : i - 1
        );

    return (
        <motion.div
            className="min-h-screen bg-brand_background py-6 px-4 mx-10 sm:px-6 lg:px-8 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-brand flex gap-2 items-center">
                <span>Home</span>
                <ChevronRight className="w-4 h-4" />
                <span>Products</span>
                <ChevronRight className="w-4 h-4" />
                <span className="font-semibold truncate max-w-xs">
                    {product.title}
                </span>
            </nav>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Left: Image Gallery */}
                <ImageGallery
                    images={product.images}
                    selectedIndex={selectedImageIndex}
                    setSelectedIndex={setSelectedImageIndex}
                    nextImage={nextImage}
                    prevImage={prevImage}
                />

                {/* Right: Product Info */}
                <div className="space-y-6">
                    <motion.h1
                        className="text-3xl sm:text-4xl font-bold text-brand"
                        layoutId={`product-title-${product.id}`}
                    >
                        {product.title}
                    </motion.h1>

                    {/* Price */}
                    <PriceSection
                        oldPrice={product.oldPrice}
                        newPrice={product.newPrice}
                        discount={product.discount}
                    />

                    <p className="text-sm text-gray-600">
                        Inclusive of all taxes • Free shipping above ₹999
                    </p>

                    {/* Quantity Selector */}
                    <QuantitySelector
                        quantity={quantity}
                        changeQuantity={changeQuantity}
                    />

                    {/* Action Buttons */}
                    <ActionButtons />

                    {/* Accordion Info */}
                    <AccordionInfo
                        accordionData={accordionData}
                        openIndex={openIndex}
                        setOpenIndex={setOpenIndex}
                    />
                </div>
            </div>

            {/* Related Products */}
            {similarProducts.length > 0 && (
                <RelatedProducts
                    products={similarProducts}
                    category={product.category}
                />
            )}
        </motion.div>
    );
};

// --- Subcomponents ---

const ImageGallery = ({
    images,
    selectedIndex,
    setSelectedIndex,
    nextImage,
    prevImage,
}) => (
    <div className="space-y-4 ">
        <motion.div className="relative border w-[75%] bg-white rounded-2xl shadow overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.img
                    key={selectedIndex}
                    src={images[selectedIndex]}
                    alt={`Product Image ${selectedIndex + 1}`}
                    className="w-full h-full object-contain "
                    loading="lazy"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                />
            </AnimatePresence>

            {/* Nav Buttons */}
            <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:shadow-lg"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextImage}
                    aria-label="Next image"
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:shadow-lg"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Counter */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                {selectedIndex + 1} / {images.length}
            </div>
        </motion.div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-2">
            {images.map((img, i) => (
                <button
                    key={i}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 ${
                        i === selectedIndex
                            ? "border-brand scale-105"
                            : "hover:scale-105"
                    } transition-transform duration-200`}
                    onClick={() => setSelectedIndex(i)}
                    aria-label={`Select image ${i + 1}`}
                >
                    <img
                        src={img}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    {i === selectedIndex && (
                        <motion.div
                            className="absolute inset-0 bg-brand/20"
                            layoutId="selected-thumbnail"
                        />
                    )}
                </button>
            ))}
        </div>
    </div>
);

const PriceSection = ({ oldPrice, newPrice, discount }) => (
    <div className="flex items-center gap-4">
        <span className="text-3xl font-bold text-brand">
            ₹{newPrice.toLocaleString()}
        </span>
        {oldPrice && (
            <span className="line-through text-gray-400 text-lg">
                ₹{oldPrice.toLocaleString()}
            </span>
        )}
        {discount && (
            <span className="bg-brand text-white px-3 py-1 rounded-full text-sm font-semibold">
                {discount} OFF
            </span>
        )}
    </div>
);

const QuantitySelector = ({ quantity, changeQuantity }) => (
    <div className="space-y-1">
        <label className="block text-sm font-medium text-brand">Quantity</label>
        <div className="flex items-center border-2 border-brand rounded-xl overflow-hidden w-max">
            <button
                onClick={() => changeQuantity(-1)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="p-3 hover:text-brand disabled:opacity-50"
            >
                <Minus className="w-4 h-4" />
            </button>
            <span className="px-5 py-3 text-lg font-semibold min-w-[3rem] text-center">
                {quantity}
            </span>
            <button
                onClick={() => changeQuantity(1)}
                disabled={quantity >= 10}
                aria-label="Increase quantity"
                className="p-3 hover:text-brand disabled:opacity-50"
            >
                <Plus className="w-4 h-4" />
            </button>
        </div>
    </div>
);

const ActionButtons = () => (
    <div className="flex flex-col sm:flex-row gap-4">
        <button
            className="flex-1 bg-brand text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow hover:shadow-lg transition"
            aria-label="Add to cart"
        >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
        </button>
        <button
            className="flex-1 bg-brand text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow hover:shadow-lg transition"
            aria-label="Buy now"
        >
            <Zap className="w-5 h-5" />
            Buy Now
        </button>
    </div>
);

const AccordionInfo = ({ accordionData, openIndex, setOpenIndex }) => (
    <div className="border-t border-gray-200 pt-6">
        {accordionData.map((item, idx) => (
            <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden mb-3"
            >
                <motion.button
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    aria-expanded={openIndex === idx}
                >
                    <div className="flex items-center gap-5   mr-4">
                        {item.icon}
                    </div>
                    <span className="flex-1 text-left font-semibold text-gray-900">
                        {item.title}
                    </span>
                    <motion.div
                        animate={{ rotate: openIndex === idx ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-5 h-5 px-2  text-gray-400" />
                    </motion.div>
                </motion.button>

                <AnimatePresence>
                    {openIndex === idx && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="bg-gray-50 p-4 text-gray-700"
                        >
                            {item.content}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        ))}
    </div>
);

const RelatedProducts = ({ products, category }) => (
    <section className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand mb-8">
            Related {category} Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </section>
);

export default ProductDetails;
