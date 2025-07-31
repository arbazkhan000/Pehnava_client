import { Loader2 } from "lucide-react";

export default function LoadingSpinner(fullScreen) {
    return (
        <div
            className={`flex items-center justify-center ${
                fullScreen ? "h-screen" : "h-full"
            }`}
        >
            <Loader2 className="h-8 w-8 animate-spin text-brand" />
        </div>
    );
}
