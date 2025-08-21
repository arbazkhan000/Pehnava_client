import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
} from "../../redux/cartSlice";
import { useAuth } from "@/context/AppContext";
import toast from "react-hot-toast";

const CartDrawer = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const cartItems = useSelector((state) => state.cart.cartItems);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        if (!isAuthenticated) {
            toast.error("Please login to proceed!");
            navigate("/login");
            return;
        }
        navigate("/checkout");
        onClose();
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold">Your Cart</h2>
                            <button onClick={onClose}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="text-center text-gray-500 py-16">
                                    Your cart is empty.
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center p-4 bg-gray-50 rounded-lg"
                                    >
                                        <img
                                            src={
                                                item.image || "/placeholder.png"
                                            }
                                            alt={item.name}
                                            className="w-14 h-14 object-cover rounded mr-4"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold">
                                                {item.name}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-300">
                                                ₹{item.price} x {item.quantity}
                                            </div>
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() =>
                                                        dispatch(
                                                            decrementQuantity(
                                                                item.id
                                                            )
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        dispatch(
                                                            incrementQuantity(
                                                                item.id
                                                            )
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        dispatch(
                                                            removeFromCart(
                                                                item.id
                                                            )
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div className="font-bold">
                                            ₹{item.price * item.quantity}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {cartItems.length > 0 && (
                            <div className="p-4 border-t flex flex-col gap-2">
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <button
                                    className="w-full bg-foreground text-white py-2 rounded"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
