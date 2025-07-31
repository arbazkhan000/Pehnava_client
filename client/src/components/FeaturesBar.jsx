
const features = [
    {
        label: "CASH ON DELIVERY",
        icon: (
            <img
                src="https://hivadostore.com/cdn/shop/files/cash-on-delivery.png?v=1748000499&width=768"
                alt=""
            />
        ),
    },
    {
        label: "EASY EXCHANGE",
        icon: (
            <img
                src="https://hivadostore.com/cdn/shop/files/return-box.png?v=1748000709&width=768"
                alt=""
            />
        ),
    },
    {
        label: "HEARTMADE",
        icon: (
            <img
                src="https://hivadostore.com/cdn/shop/files/love.png?v=1748001972&width=768"
                alt=""
            />
        ),
    },
    {
        label: "EASY CUSTOMER SUPPORT",
        icon: (
            <img
                src="https://hivadostore.com/cdn/shop/files/customer-service_1.png?v=1748001669&width=768"
                alt=""
            />
        ),
    },
    {
        label: "MADE IN INDIA",
        icon: (
            <img
                src="https://hivadostore.com/cdn/shop/files/made-in-india_1.png?v=1748002054&width=768"
                alt=""
            />
        ),
    },
    {
        label: "SECURE PAYMENT",
        icon: (
            <img
                src="https://hivadostore.com/cdn/shop/files/security_1.png?v=1748001809&width=768"
                alt=""
            />
        ),
    },
];

const FeaturesBar = () => {
    return (
        <div className="w-full  py-6 sm:py-8 border-t  border-b border-foreground">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center p-2  rounded-lg transition-colors duration-200"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 flex items-center justify-center">
                                {feature.icon}
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">
                                {feature.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesBar;