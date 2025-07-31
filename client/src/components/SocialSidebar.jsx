import { MessageCircle, Instagram, Facebook, Twitter } from "lucide-react";

const SocialSidebar = () => {
    return (
        <div className="hidden sm:flex fixed right-0 top-1/2 transform -translate-y-1/2 flex-col gap-4 p-2 bg-white rounded-l-md shadow-lg z-50 text-brand">
            <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="WhatsApp"
            >
                <MessageCircle size={28} />
            </a>
            <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="Instagram"
            >
                <Instagram size={28} />
            </a>
            <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="Facebook"
            >
                <Facebook size={28} />
            </a>
            <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform"
                aria-label="Twitter"
            >
                <Twitter size={28} />
            </a>
        </div>
    );
};

export default SocialSidebar;
