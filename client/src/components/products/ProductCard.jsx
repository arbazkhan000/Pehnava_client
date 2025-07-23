import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            onClick={() => navigate(`/product/${product.slug}`)}
            className="bg-brand_background transition-all duration-300 overflow-hidden cursor-pointer relative group"
        >
            <div className="relative">
                <div className="relative w-full aspect-square">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover rounded transition-opacity duration-300"
                        loading="eager"
                    />
                </div>

                {product.sale && (
                    <span className="absolute top-2 left-2 bg-brand text-white px-2 py-1 text-xs font-bold rounded uppercase shadow-md z-10">
                        Sale
                    </span>
                )}
            </div>

            <div className="pt-2 px-2 pb-3">
                <h3 className="font-semibold text-brand text-base sm:text-lg mb-2 line-clamp-2 min-h-[1rem]">
                    {product.title}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                    <p className="text-lg font-semibold text-brand">
                        ₹{product.newPrice}
                    </p>
                    {product.oldPrice && (
                        <p className="text-gray-500 line-through">
                            ₹{product.oldPrice}
                        </p>
                    )}
                    {product.discount && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                            {product.discount}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
