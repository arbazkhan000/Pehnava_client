import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useProduct } from "@/context/ProductContext";
import {
    ChevronDown,
    ClipboardList,
    LogIn,
    LogOut,
    Menu,
    Search,
    ShoppingBag,
    User,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import BrandLogo from "../assets/logo.png";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { categories = [] } = useProduct();
    const searchRef = useRef();
    const searchInputRef = useRef();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [cartItems] = useState([
        {
            id: 1,
            name: "Classic T-Shirt",
            price: 499,
            quantity: 2,
            image: "https://via.placeholder.com/60x60.png?text=Item+1",
        },
        {
            id: 2,
            name: "Denim Jeans",
            price: 1299,
            quantity: 1,
            image: "https://via.placeholder.com/60x60.png?text=Item+2",
        },
    ]);

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

    const handleLogout = () => {
        setUser(null);
        navigate("/");
    };

   const handleSearchSubmit = () => {
       if (searchQuery.trim()) {
           const encodedQuery = encodeURIComponent(searchQuery.trim());
           navigate(`/search/${encodedQuery}`); 
           setSearchOpen(false);
           setSearchQuery("");
       }
   };

    return (
        <header
            className={`sticky top-0 z-50 w-full ${
                searchOpen ? "h-40" : "h-24"
            } bg-background text-foreground shadow-sm transition-all duration-300 ${
                isScrolled
                    ? "shadow-lg backdrop-blur-md bg-white/70 dark:bg-gray-900/70"
                    : ""
            }`}
        >
            <div className="max-w-screen-xl mx-auto h-24 flex items-center justify-between px-6 md:px-8 py-3 md:py-4 relative">
                {/* Left: Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3 text-xl font-extrabold text-brand focus:outline-none focus:ring-2 focus:ring-brand/70 rounded"
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
                            `text-base hover:text-brand transition-colors ${
                                isActive
                                    ? "text-brand underline underline-offset-4 decoration-2"
                                    : "text-gray-600"
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="text-base font-semibold text-gray-700 flex items-center gap-1 hover:text-brand transition-colors focus:outline-none focus:ring-2 focus:ring-brand/70 rounded"
                                aria-haspopup="true"
                            >
                                Categories
                                <ChevronDown size={16} />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-60 max-h-96 overflow-y-auto z-50 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800">
                            <DropdownMenuLabel className="text-xs text-gray-500 uppercase px-4 py-2 select-none">
                                Browse Categories
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {categories.length > 0 ? (
                                categories.map((item) => (
                                    <DropdownMenuItem asChild key={item.name}>
                                        <Link
                                            to={item.path}
                                            className="w-full text-sm text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand px-4 py-2 rounded cursor-pointer focus:bg-brand/10 focus:outline-none"
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
                            `text-base hover:text-brand transition-colors ${
                                isActive
                                    ? "text-brand underline underline-offset-4 decoration-2"
                                    : "text-gray-600"
                            }`
                        }
                    >
                        About
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `text-base hover:text-brand transition-colors ${
                                isActive
                                    ? "text-brand underline underline-offset-4 decoration-2"
                                    : "text-gray-600"
                            }`
                        }
                    >
                        Contact
                    </NavLink>
                </nav>

                {/* Right: Icons */}
                <div className="flex items-center gap-5">
                    {/* Search Container */}
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
                                            className="w-full px-4 py-2 pr-10 border-2 border-foreground rounded-full outline-none transition-all bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
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
                                            className="absolute right-3 text-gray-400 hover:text-brand transition-colors"
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
                                    className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    onClick={() => setSearchOpen(true)}
                                    aria-label="Open search"
                                >
                                    <Search
                                        size={22}
                                        className="text-gray-600 hover:text-brand dark:hover:text-brand"
                                    />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cart Drawer */}
                    <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
                        <DrawerTrigger asChild>
                            <button className="relative" aria-label="Open cart">
                                <ShoppingBag size={24} />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartItems.length}
                                </span>
                            </button>
                        </DrawerTrigger>
                        <DrawerContent className=" p-6 rounded-t-lg max-w-4xl mx-auto">
                            <DrawerHeader>
                                <DrawerTitle className="text-xl font-bold">
                                    Your Cart
                                </DrawerTitle>
                                <DrawerClose asChild>
                                    <button
                                        className="absolute top-4 right-4 text-gray-600 hover:text-brand"
                                        aria-label="Close cart"
                                    >
                                        <X size={24} />
                                    </button>
                                </DrawerClose>
                            </DrawerHeader>
                            {cartItems.length === 0 ? (
                                <div className="text-center text-gray-500 py-16">
                                    Your cart is empty.
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4 mb-8">
                                        {cartItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center  rounded-lg p-4"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-14 h-14 object-cover rounded mr-4"
                                                />
                                                <div className="flex-1">
                                                    <div className="font-semibold">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-foreground text-sm">
                                                        ₹{item.price} x{" "}
                                                        {item.quantity}
                                                    </div>
                                                </div>
                                                <div className="font-bold">
                                                    ₹
                                                    {item.price * item.quantity}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-4 border-t">
                                        <div className="flex justify-between items-center text-lg font-semibold mb-4">
                                            <span>Subtotal</span>
                                            <span>
                                                ₹
                                                {cartItems.reduce(
                                                    (sum, item) =>
                                                        sum +
                                                        item.price *
                                                            item.quantity,
                                                    0
                                                )}
                                            </span>
                                        </div>
                                        <button className="w-full bg-brand text-foreground py-2 rounded hover:bg-brand-dark transition">
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </>
                            )}
                        </DrawerContent>
                    </Drawer>

                    {/* Profile Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                aria-label="User menu"
                                className="w-6 h-6 text-gray-600 hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/70 rounded transition-colors"
                            >
                                <User />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="w-48 rounded-md border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800"
                        >
                            {user ? (
                                <>
                                    <DropdownMenuLabel className="px-4 py-2 text-sm text-gray-500 select-none">
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            to="/profile"
                                            className="text-sm flex gap-2 items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand cursor-pointer rounded focus:bg-brand/10 focus:outline-none"
                                        >
                                            <ClipboardList className="w-4 h-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="text-sm flex gap-2 items-center px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 cursor-pointer rounded focus:outline-none focus:bg-red-100 dark:focus:bg-red-800"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <DropdownMenuItem asChild>
                                    <Link
                                        to="/login"
                                        className="text-sm flex gap-2 items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand cursor-pointer rounded focus:bg-brand/10 focus:outline-none"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        Login
                                    </Link>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Mobile Menu Drawer */}
                    <Drawer
                        open={isMobileMenuOpen}
                        onOpenChange={setIsMobileMenuOpen}
                    >
                        <DrawerTrigger asChild>
                            <button
                                className="md:hidden w-6 h-6 text-gray-600 hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/70 rounded transition-colors"
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </button>
                        </DrawerTrigger>
                        <DrawerContent className="bg-white dark:bg-gray-900 p-6 rounded-t-lg">
                            <DrawerHeader>
                                <DrawerTitle className="text-xl font-bold">
                                    Menu
                                </DrawerTitle>
                                <DrawerClose asChild>
                                    <button
                                        className="absolute top-4 right-4 text-gray-600 hover:text-brand"
                                        aria-label="Close menu"
                                    >
                                        <X size={24} />
                                    </button>
                                </DrawerClose>
                            </DrawerHeader>
                            <nav className="flex flex-col gap-4 mt-4">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `text-base hover:text-brand transition-colors ${
                                            isActive
                                                ? "text-brand underline underline-offset-4 decoration-2"
                                                : "text-gray-600"
                                        }`
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Home
                                </NavLink>
                                <div>
                                    <button
                                        className="text-base font-semibold text-gray-700 flex items-center gap-1 hover:text-brand transition-colors"
                                        aria-haspopup="true"
                                    >
                                        Categories
                                        <ChevronDown size={16} />
                                    </button>
                                    <div className="mt-2 pl-4">
                                        {categories.length > 0 ? (
                                            categories.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.path}
                                                    className="block text-sm text-gray-700 dark:text-gray-300 hover:text-brand dark:hover:text-brand py-1"
                                                    onClick={() =>
                                                        setIsMobileMenuOpen(
                                                            false
                                                        )
                                                    }
                                                >
                                                    {item.name}
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="text-sm text-gray-500">
                                                No categories available
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `text-base hover:text-brand transition-colors ${
                                            isActive
                                                ? "text-brand underline underline-offset-4 decoration-2"
                                                : "text-gray-600"
                                        }`
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    About
                                </NavLink>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `text-base hover:text-brand transition-colors ${
                                            isActive
                                                ? "text-brand underline underline-offset-4 decoration-2"
                                                : "text-gray-600"
                                        }`
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Contact
                                </NavLink>
                            </nav>
                        </DrawerContent>
                    </Drawer>
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
                        className="md:hidden w-full bg-white dark:bg-gray-900 shadow-sm px-6 py-3 absolute bottom-0 left-0 right-0"
                    >
                        <div className="relative flex items-center max-w-screen-xl mx-auto">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search suits, sarees, kurtis..."
                                className="w-full px-4 py-2 pr-10 border-2 border-brand rounded-full outline-none focus:ring-2 focus:ring-brand/50 transition-all bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearchSubmit();
                                    }
                                }}
                            />
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute right-3 text-gray-400 hover:text-brand transition-colors"
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
    );
};

export default Navbar;
