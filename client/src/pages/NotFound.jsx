import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <h1 className="text-[120px] font-bold text-brand leading-none">
                404
            </h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Page Not Found
            </h2>
            <p className="text-gray-600 max-w-md mb-8">
                Sorry, the page you are looking for doesn't exist or has been
                moved.
            </p>

            <Link
                to="/"
                className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-brand/90 transition-all"
            >
                <ArrowLeft size={18} />
                Go to Homepage
            </Link>

            
        </div>
    );
};

export default NotFound;
