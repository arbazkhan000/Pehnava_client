import brandLogo from "../assets/My logo.png";

const Footer = () => {
    return (
        <footer className="bg-[#fff7f7] border-t border-brand pt-6 pb-2 text-brand">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8 justify-between">
                {/* Logo and Social */}
                <div className="flex-1 flex flex-col items-center md:items-start">
                    <img
                        src={brandLogo}
                        alt="Hivado Logo"
                        className="w-32 mb-2"
                    />
                    <div className="text-xs mb-3">
                        wear what your heart says
                    </div>
                    <div className="flex gap-3">
                        {[
                            {
                                label: "WhatsApp",
                                src: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
                            },
                            {
                                label: "Facebook",
                                src: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
                            },
                            {
                                label: "Instagram",
                                src: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
                            },
                        ].map((item, idx) => (
                            <a key={idx} href="#" aria-label={item.label}>
                                <img
                                    src={item.src}
                                    alt={item.label}
                                    className="w-5 h-5"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Shop Links */}
                <div className="flex-1">
                    <div className="font-serif font-semibold mb-2">SHOP</div>
                    <ul className="space-y-1 text-sm">
                        {[
                            "Home",
                            "Fresh Drops",
                            "Collection",
                            "Say Hello",
                            "Our Story",
                        ].map((item, i) => (
                            <li key={i}>
                                <a href="#">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Information Links */}
                <div className="flex-1">
                    <div className="font-serif font-semibold mb-2">
                        INFORMATION
                    </div>
                    <ul className="space-y-1 text-sm">
                        {[
                            "Style Finder",
                            "Privacy Policy",
                            "Easy Returns & Swaps",
                            "How & When You Get It",
                            "Order Tracking",
                            "Exchange Request",
                        ].map((info, i) => (
                            <li key={i}>
                                <a href="#">{info}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact & Sign-up */}
                <div className="flex-1">
                    <div className="font-serif font-semibold mb-2">
                        Contact Us
                    </div>
                    <div className="text-sm mb-2">
                        Got a question or just wanna say hey?
                        <br />
                        Drop us a line at{" "}
                        <a
                            href="mailto:info@hivadostore.com"
                            className="font-semibold underline"
                        >
                            info@hivadostore.com
                        </a>{" "}
                        or call us at{" "}
                        <span className="font-semibold">+91-9588090218</span>
                        <br />
                        (Mon–Sat, 10AM–6PM).
                        <br />
                        We're always happy to help!
                    </div>
                    <form className="flex flex-col sm:flex-row mt-3 border border-brand rounded max-w-md overflow-hidden">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="flex-1 px-3 py-2 outline-none bg-transparent text-sm"
                        />
                        <button
                            type="submit"
                            className="bg-brand text-white px-4 py-2 text-sm font-semibold hover:bg-brand/90 transition w-full sm:w-auto"
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>

            <hr className="my-4 border-brand" />

            <div className="text-xs text-center text-brand/80">
                © 2025 Pehnava
            </div>
        </footer>
    );
};

export default Footer;
