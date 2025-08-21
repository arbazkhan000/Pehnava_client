import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearCart } from "../../redux/cartSlice";
import { useAuth } from "@/context/AppContext";

const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);

const Checkout = () => {
    const { user, isAuthenticated } = useAuth();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
    });

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Please login to checkout!");
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    if (cartItems.length === 0)
        return (
            <div className="min-h-screen flex items-center justify-center text-xl">
                Your cart is empty
            </div>
        );

    const handleChange = (e) =>
        setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        // Backend integration placeholder
        console.log({ cartItems, address });
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        navigate("/orders");
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Cart Summary */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Your Products</h2>
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between border p-3 rounded-lg shadow-sm"
                        >
                            <span>{item.name}</span>
                            <span>
                                {formatPrice(item.price * item.quantity)}
                            </span>
                        </div>
                    ))}
                    <div className="flex justify-between mt-4 border-t pt-3 font-bold text-lg">
                        <span>Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                </div>

                {/* Address Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        "name",
                        "email",
                        "phone",
                        "addressLine1",
                        "addressLine2",
                        "city",
                        "state",
                        "pincode",
                    ].map((field) => (
                        <input
                            key={field}
                            type="text"
                            name={field}
                            placeholder={field}
                            value={address[field]}
                            onChange={handleChange}
                            required
                            className="w-full border p-2 rounded-lg"
                        />
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-foreground text-white py-3 rounded-lg"
                    >
                        Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
