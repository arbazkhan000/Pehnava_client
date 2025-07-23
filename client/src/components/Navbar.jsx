import { AnimatePresence, motion } from "framer-motion";
import {
    ClipboardList,
    Instagram,
    LogIn,
    LogOut,
    Menu,
    Search,
    ShoppingBag,
    User,
    UserCircle,
    X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import BrandLogo from "../assets/My logo.png";
import Cart from "./cart/Cart";

const Navbar = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const profileRef = useRef(null);
    const searchRef = useRef(null);
    const searchInputRef = useRef(null);

    const handleClickOutside = useCallback((event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setProfileOpen(false);
        }
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchOpen(false);
            setSearchQuery("");
        }
    }, []);

    useEffect(() => {
        if (profileOpen || searchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileOpen, searchOpen, handleClickOutside]);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    // Framer Motion Variants
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const drawerVariants = (direction = "left") => ({
        hidden: { x: direction === "left" ? "-100%" : "100%" },
        visible: { x: 0 },
        exit: { x: direction === "left" ? "-100%" : "100%" },
    });

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };

    const searchVariants = {
        hidden: { width: 0, opacity: 0 },
        visible: { width: "auto", opacity: 1 },
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-brand-background h-24 px-4 sm:px-6 md:px-10 shadow flex items-center justify-between border-b border-brand">
                {/* Left: Logo and Menu */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="lg:hidden"
                        aria-label="Open mobile menu"
                    >
                        <Menu size={24} />
                    </button>
                    <Link to="/">
                        <img
                            src={BrandLogo}
                            alt="Logo"
                            className="h-16 sm:h-24 w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* Center: Desktop NavLinks */}
                <div className="hidden lg:flex gap-6 text-[15px] font-medium text-gray-700 tracking-wide">
                    {["/", "/about", "/contact"].map((path, index) => {
                        const label = ["Home", "About Us", "Contact Us"][index];
                        return (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-brand font-semibold hover:text-brand transition"
                                        : "text-gray-600 hover:text-brand transition"
                                }
                            >
                                {label}
                            </NavLink>
                        );
                    })}
                </div>

                {/* Right: Search, Profile, Cart */}
                <div className="flex items-center gap-5">
                    {/* Search Container */}
                    <div className="relative" ref={searchRef}>
                        <AnimatePresence>
                            {searchOpen ? (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "16rem", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="origin-right overflow-hidden"
                                >
                                    <div className="relative flex items-center">
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            placeholder="Search suits, sarees, kurtis..."
                                            className="w-full px-4 py-2 pr-10 border-2 outline-none border-brand rounded-full   transition-all bg-white text-sm"
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Enter" &&
                                                    searchQuery.trim()
                                                ) {
                                                    console.log(
                                                        "Searching for:",
                                                        searchQuery
                                                    );
                                                    // Add actual search logic here
                                                }
                                            }}
                                        />
                                        {/* Close Button */}
                                        <button
                                            className="absolute right-3 text-gray-400 hover:text-brand transition"
                                            onClick={() => {
                                                setSearchOpen(false);
                                                setSearchQuery("");
                                            }}
                                            aria-label="Close search"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                    onClick={() => setSearchOpen(true)}
                                    aria-label="Open search"
                                >
                                    <Search
                                        size={22}
                                        className="text-gray-600 hover:text-brand transition-colors"
                                    />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center focus:outline-none"
                            aria-expanded={profileOpen}
                            aria-label="User menu"
                        >
                            <User
                                size={22}
                                className="text-gray-600 hover:text-brand transition-colors"
                            />
                        </button>

                        <AnimatePresence>
                            {profileOpen && (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={dropdownVariants}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-3 w-56 bg-white rounded-md shadow-lg z-50 border border-gray-100"
                                    role="menu"
                                >
                                    <div className="px-4 py-3 bg-gray-50 border-b">
                                        <p className="text-sm font-medium text-gray-900">
                                            Welcome!
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Sign in for better experience
                                        </p>
                                    </div>
                                    <ul className="py-1">
                                        <li>
                                            <Link
                                                to="/login"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                role="menuitem"
                                            >
                                                <LogIn className="w-4 h-4 mr-2" />
                                                Sign In
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/orders"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                role="menuitem"
                                            >
                                                <ClipboardList className="w-4 h-4 mr-2" />
                                                My Orders
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                role="menuitem"
                                            >
                                                <UserCircle className="w-4 h-4 mr-2" />
                                                Profile
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="px-4 py-2 bg-gray-50 border-t">
                                        <button className="flex items-center text-sm text-gray-700 hover:text-brand transition-colors">
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign Out
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cart Icon */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ShoppingBag
                            size={22}
                            onClick={() => setCartOpen(true)}
                            className="cursor-pointer text-gray-600 hover:text-brand transition-colors"
                            aria-label="Cart"
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a
                            href="https://www.instagram.com/yourhandle"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <Instagram className="cursor-pointer text-gray-600 hover:text-brand transition-colors" />
                        </a>
                    </motion.div>
                </div>
            </nav>

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
                            variants={drawerVariants("right")}
                            transition={{ type: "tween", ease: "easeInOut" }}
                            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-lg"
                        >
                            <button
                                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black z-10"
                                onClick={() => setCartOpen(false)}
                            >
                                &times;
                            </button>
                            <Cart />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={overlayVariants}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={drawerVariants("left")}
                            transition={{ type: "tween", ease: "easeInOut" }}
                            className="fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-white p-6 shadow-md"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <img
                                    src={BrandLogo}
                                    alt="Logo"
                                    className="h-14 object-contain"
                                />
                                <X
                                    size={24}
                                    onClick={() => setMobileOpen(false)}
                                    className="cursor-pointer"
                                />
                            </div>
                            <div className="space-y-4 font-medium text-gray-700 text-lg">
                                {["/", "/about", "/contact"].map(
                                    (path, index) => {
                                        const label = [
                                            "Home",
                                            "About Us",
                                            "Contact Us",
                                        ][index];
                                        return (
                                            <NavLink
                                                key={path}
                                                to={path}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "text-brand font-semibold"
                                                        : "text-gray-700"
                                                }
                                                onClick={() =>
                                                    setMobileOpen(false)
                                                }
                                            >
                                                {label}
                                            </NavLink>
                                        );
                                    }
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
