import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
    ClipboardList,
    LogIn,
    LogOut,
    Menu,
    Search,
    ShoppingBag,
    User,
    UserCircle,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import BrandLogo from "../assets/My logo.png";
import Cart from "./cart/Cart";

const Navbar = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };
        if (profileOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileOpen]);

    // Animation variants
    const profileVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };

    const mobileNavVariants = {
        hidden: { x: "-100%" },
        visible: { x: 0 },
        exit: { x: "-100%" },
    };

    const cartVariants = {
        hidden: { x: "100%" },
        visible: { x: 0 },
        exit: { x: "100%" },
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <>
            <nav className="h-32  px-4 border-b border-brand sm:px-6 md:px-10 shadow-md flex items-center justify-between">
                {/* Left: Logo */}

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden"
                    >
                        <Menu size={24} />
                    </button>
                    <Link to="/">
                        <img
                            src={BrandLogo}
                            alt="Logo"
                            className="h-16 sm:h-28 w-auto object-contain"
                            style={{ minWidth: "120px" }}
                        />
                    </Link>
                </div>

                {/* Center: Nav Links (Desktop Only) */}
                <div className="hidden lg:flex gap-6 text-[15px] font-medium text-gray-700 tracking-wide">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-brand" : "text-gray-600"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? "text-brand" : "text-gray-600"
                        }
                    >
                        About Us
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            isActive ? "text-brand" : "text-gray-600"
                        }
                    >
                        Contact Us
                    </NavLink>
                </div>

                {/* Right: Icons */}
                <div className="flex items-center gap-5">
                    <Search
                        onClick={() => setSearchOpen(true)}
                        size={22}
                        className="cursor-pointer text-gray-600 text-brand"
                    />

                    {/* Enhanced User Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-1 focus:outline-none"
                        >
                            <User
                                size={22}
                                className="cursor-pointer text-gray-600 text-brand"
                            />
                        </button>

                        <AnimatePresence>
                            {profileOpen && (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={profileVariants}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-100"
                                >
                                    {/* Profile Header */}
                                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                                        <p className="text-sm font-medium text-gray-900">
                                            Welcome!
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Sign in for better experience
                                        </p>
                                    </div>

                                    {/* Menu Items */}
                                    <ul className="py-1">
                                        <li>
                                            <Link
                                                to="/login"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <LogIn className="w-4 h-4 mr-3" />
                                                Sign In
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/orders"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <ClipboardList className="w-4 h-4 mr-3" />
                                                My Orders
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <UserCircle className="w-4 h-4 mr-3" />
                                                Profile
                                            </Link>
                                        </li>
                                    </ul>

                                    {/* Footer */}
                                    <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                                        <button className="flex items-center text-sm text-gray-700 hover:text-brand">
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign Out
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cart */}
                    <ShoppingBag
                        size={22}
                        onClick={() => setCartOpen(true)}
                        className="cursor-pointer text-gray-600 hover:text-brand"
                    />
                </div>
            </nav>

            {/* Mobile Nav Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={overlayVariants}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={mobileNavVariants}
                            transition={{ type: "tween", ease: "easeInOut" }}
                            className="lg:hidden fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-white p-6 shadow-md"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <img
                                    src={BrandLogo}
                                    alt="Logo"
                                    className="h-14 object-contain"
                                />
                                <X
                                    size={24}
                                    className="cursor-pointer"
                                    onClick={() => setMobileOpen(false)}
                                />
                            </div>
                            <div className="space-y-4 text-gray-700 font-medium text-lg">
                                <NavLink
                                    to="/"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/about"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    About Us
                                </NavLink>
                                <NavLink
                                    to="/contact"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Contact Us
                                </NavLink>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Search Dialog */}
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-lg">
                            Search Products
                        </DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <input
                            type="text"
                            placeholder="Search for suits, sarees, kurtis..."
                            className="w-full px-4 py-2 border rounded-md outline-none"
                            autoFocus
                        />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Cart Drawer */}
            <AnimatePresence>
                {cartOpen && (
                    <>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={overlayVariants}
                            className="fixed inset-0 bg-black bg-opacity-30 z-40"
                            onClick={() => setCartOpen(false)}
                        />
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={cartVariants}
                            transition={{ type: "tween", ease: "easeInOut" }}
                            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-lg"
                        >
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold z-10"
                                onClick={() => setCartOpen(false)}
                            >
                                &times;
                            </button>
                            <Cart />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
