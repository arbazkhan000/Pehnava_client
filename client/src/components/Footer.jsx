import brandLogo from "../assets/logo.png";

const Footer = () => {
    return (
        <footer className="border-t border-brand pt-6 pb-2 text-brand text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Tagline */}
                    <div className="flex flex-col items-center md:items-start">
                        <img
                            src={brandLogo}
                            alt="Hivado Logo"
                            className="w-32 mb-2"
                        />
                        <div className="text-xs mb-3 text-center md:text-left">
                            wear what your heart says
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="font-serif font-semibold mb-3 text-lg">
                            SHOP
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {[
                                "Home",
                                "Categories",
                                "About Us",
                                "Contact Us",
                            ].map((item, i) => (
                                <li key={i}>
                                    <a href="#" className="hover:underline">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Information Links */}
                    <div>
                        <h3 className="font-serif font-semibold mb-3 text-lg">
                            INFORMATION
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {[
                                "Style Finder",
                                "Privacy Policy",
                                "Easy Returns & Swaps",
                                "How & When You Get It",
                                "Order Tracking",
                                "Exchange Request",
                            ].map((info, i) => (
                                <li key={i}>
                                    <a href="#" className="hover:underline">
                                        {info}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div>
                        <h3 className="font-serif font-semibold mb-3 text-lg">
                            Contact Us
                        </h3>
                        <div className="text-sm mb-4">
                            <p className="mb-2">
                                Got a question or just wanna say hey?
                            </p>
                            <p className="mb-1">
                                Email:{" "}
                                <a
                                    href="mailto:info@hivadostore.com"
                                    className="font-semibold underline hover:text-brand/80"
                                >
                                    info@hivadostore.com
                                </a>
                            </p>
                            <p>
                                Phone:{" "}
                                <span className="font-semibold">
                                    +91-9588090218
                                </span>
                            </p>
                        </div>

                        <div className="mb-2 text-sm">
                            Sign up for updates and special offers:
                        </div>
                        <form className="flex flex-col sm:flex-row border border-brand rounded-lg overflow-hidden">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 px-4 py-2 outline-none bg-transparent text-sm"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-brand text-white px-4 py-2 text-sm font-semibold hover:bg-brand/90 transition-colors"
                            >
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-6 border-brand" />

                {/* Copyright */}
                <div className="text-xs text-center text-brand/80 pb-2">
                    © {new Date().getFullYear()} Pehnava. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
