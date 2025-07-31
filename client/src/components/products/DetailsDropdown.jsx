import { useState } from "react";

const DetailsDropdown = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b">
            <button
                className="w-full text-left py-4 px-2 flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium">{title}</span>
                <span>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <div className="p-4 text-gray-600">{content}</div>}
        </div>
    );
};

export default DetailsDropdown;
