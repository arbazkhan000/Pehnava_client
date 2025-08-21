import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AppContext";
import { useProduct } from "@/context/ProductContext";
import { AnimatePresence, motion } from "framer-motion";
import {
    ChevronDown,
    LogIn,
    LogOut,
    Search,
    ShoppingBag,
    User,
    X,
    LayoutDashboard,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import BrandLogo from "../assets/logo.png";
import CartDrawer from "../components/cart/CartDrawer";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Navbar = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { categories = [] } = useProduct();
    const searchRef = useRef();
    const searchInputRef = useRef();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { user, logout } = useAuth();
    const { cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    const handleSearchSubmit = async () => {
        if (searchQuery.trim()) {
            const encodedQuery = encodeURIComponent(searchQuery.trim());
            navigate(`/search/${encodedQuery}`);
            setSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <>
            <header
                className={`sticky top-0 z-50 w-full ${
                    searchOpen ? "h-40" : "h-24"
                } bg-background text-foreground shadow-sm transition-all duration-300 ${
                    isScrolled ? "shadow-lg backdrop-blur-md bg-white/70" : ""
                }`}
            >
                <div className="max-w-screen-xl mx-auto h-24 flex items-center justify-between px-6 md:px-8 py-3 md:py-4 relative">
                    {/* Left: Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 text-xl font-extrabold text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/70 rounded"
                        aria-label="Homepage"
                    >
                        <img
                            src={BrandLogo}
                            alt="Brand Logo"
                            className="h-16 sm:h-20 w-auto object-contain"
                            draggable={false}
                        />
                    </Link>

                    {/* Center: Navigation */}
                    <nav className="hidden md:flex items-center gap-8 font-semibold">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-base hover:text-foreground transition-colors ${
                                    isActive
                                        ? "text-foreground underline underline-offset-4 decoration-2"
                                        : "text-gray-600"
                                }`
                            }
                        >
                            Home
                        </NavLink>

                        {/* Categories Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="text-base font-semibold text-gray-700 flex items-center gap-1 hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/70 rounded"
                                    aria-haspopup="true"
                                >
                                    Categories
                                    <ChevronDown size={16} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-60 max-h-96 overflow-y-auto z-50 rounded-md border border-gray-200 shadow-lg bg-white">
                                <DropdownMenuLabel className="text-xs text-gray-500 uppercase px-4 py-2 select-none">
                                    Browse Categories
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {categories.length > 0 ? (
                                    categories.map((item) => (
                                        <DropdownMenuItem
                                            asChild
                                            key={item.name}
                                        >
                                            <Link
                                                to={item.path}
                                                className="w-full text-sm text-gray-700 hover:text-foreground px-4 py-2 rounded cursor-pointer focus:bg-foreground/10 focus:outline-none"
                                            >
                                                {item.name}
                                            </Link>
                                        </DropdownMenuItem>
                                    ))
                                ) : (
                                    <DropdownMenuItem className="text-sm text-gray-500 px-4 py-2">
                                        No categories available
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `text-base hover:text-foreground transition-colors ${
                                    isActive
                                        ? "text-foreground underline underline-offset-4 decoration-2"
                                        : "text-gray-600"
                                }`
                            }
                        >
                            About
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                `text-base hover:text-foreground transition-colors ${
                                    isActive
                                        ? "text-foreground underline underline-offset-4 decoration-2"
                                        : "text-gray-600"
                                }`
                            }
                        >
                            Contact
                        </NavLink>
                    </nav>

                    {/* Right: Icons */}
                    <div className="flex items-center gap-5">
                        {/* Search */}
                        <div className="relative" ref={searchRef}>
                            <AnimatePresence>
                                {searchOpen ? (
                                    <motion.div
                                        key="desktop-search"
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: "16rem", opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="hidden md:block origin-right overflow-hidden"
                                    >
                                        <div className="relative flex items-center">
                                            <input
                                                ref={searchInputRef}
                                                type="text"
                                                placeholder="Search suits, sarees, kurtis..."
                                                className="w-full px-4 py-2 pr-10 border-2 border-foreground rounded-full outline-none transition-all text-sm text-gray-800 placeholder-gray-400 shadow-sm"
                                                value={searchQuery}
                                                onChange={(e) =>
                                                    setSearchQuery(
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleSearchSubmit();
                                                    }
                                                }}
                                            />
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="absolute right-3 text-gray-400 hover:text-foreground transition-colors"
                                                onClick={() => {
                                                    setSearchOpen(false);
                                                    setSearchQuery("");
                                                }}
                                                aria-label="Close search"
                                            >
                                                <X size={18} />
                                            </motion.button>
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
                                            className="text-foreground"
                                        />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Cart */}
                        <button
                            className="relative"
                            aria-label="Open cart"
                            aria-expanded={isCartOpen}
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingBag size={24} />
                            <span className="absolute -top-2 -right-2 bg-foreground text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartItems.length}
                            </span>
                        </button>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    aria-label="User menu"
                                    className="focus:outline-none focus:ring-2 focus:ring-foreground/70 rounded-full transition-colors"
                                >
                                    {user ? (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="bg-foreground text-white">
                                                {user.displayName
                                                    ? user.displayName
                                                          .charAt(0)
                                                          .toUpperCase()
                                                    : user.email
                                                          .charAt(0)
                                                          .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    ) : (
                                        <div className="p-1.5 rounded-full hover:bg-gray-100">
                                            <User className="h-5 w-5 text-gray-600 hover:text-foreground" />
                                        </div>
                                    )}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-56 rounded-md border border-gray-200 shadow-lg bg-white"
                            >
                                {user ? (
                                    <>
                                        <DropdownMenuLabel className="flex items-center gap-3 px-4 py-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarFallback className="bg-foreground text-white">
                                                    {user.displayName
                                                        ? user.displayName
                                                              .charAt(0)
                                                              .toUpperCase()
                                                        : user.email
                                                              .charAt(0)
                                                              .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="truncate">
                                                <p className="font-medium text-sm truncate">
                                                    {user.displayName ||
                                                        "My Account"}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />

                                        {/* Admin Dashboard link */}
                                        {(user?.role === "admin" ||
                                            user?.email ===
                                                "admin@gmail.com") && (
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    to="/admin/dashboard"
                                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:text-foreground cursor-pointer rounded focus:bg-foreground/10"
                                                >
                                                    <LayoutDashboard className="h-4 w-4" />
                                                    Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                        )}

                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:text-foreground cursor-pointer rounded"
                                            onClick={logout}
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownMenuLabel className="px-4 py-2 text-sm">
                                            Welcome Guest
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link
                                                to="/login"
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-foreground cursor-pointer rounded focus:bg-foreground/10"
                                            >
                                                <LogIn className="h-4 w-4" />
                                                Login
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                to="/register"
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-foreground cursor-pointer rounded focus:bg-foreground/10"
                                            >
                                                <User className="h-4 w-4" />
                                                Create Account
                                            </Link>
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Mobile Search */}
                <AnimatePresence>
                    {searchOpen && (
                        <motion.div
                            key="mobile-search"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden w-full bg-white shadow-sm px-6 py-3 absolute bottom-0 left-0 right-0"
                        >
                            <div className="relative flex items-center max-w-screen-xl mx-auto">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search suits, sarees, kurtis..."
                                    className="w-full px-4 py-2 pr-10 border-2 border-foreground rounded-full outline-none focus:ring-2 focus:ring-foreground/50 transition-all bg-white text-sm text-gray-800 placeholder-gray-400 shadow-sm"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearchSubmit();
                                        }
                                    }}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="absolute right-3 text-gray-400 hover:text-foreground transition-colors"
                                    onClick={() => {
                                        setSearchOpen(false);
                                        setSearchQuery("");
                                    }}
                                    aria-label="Close search"
                                >
                                    <X size={18} />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Cart Drawer */}
            <CartDrawer
                open={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
            />
        </>
    );
};

export default Navbar;
