// components/products/ProductCard.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group   overflow-hidden  transition-all duration-200"
        >
            <Link to={`/product/${product.slug}`} className="block">
                {/* Product Image */}
                <div className="aspect-square overflow-hidden relative">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-[310px] h-[235px] rounded-md    object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                    />
                </div>

                {/* Product Info */}
                <div className="p-3">
                    <h3 className="text-sm font-medium line-clamp-1">
                        {product.title}
                    </h3>
                    <div className="flex justify-between items-center mt-1">
                        <p className="text-sm font-semibold">
                            ₹{product.price}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
