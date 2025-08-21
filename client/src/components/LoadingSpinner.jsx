// components/LoadingSpinner.tsx

const LoadingSpinner = ({ fullScreen = false, size = 50 }) => {
    const wrapperClass = fullScreen
        ? "fixed inset-0 flex items-center justify-center bg-black/20 z-50"
        : "flex items-center justify-center";

    return (
        <div className={wrapperClass}>
            <div
                className="border-4 border-t-4 border-gray-200 border-t-foreground rounded-full animate-spin"
                style={{ width: size, height: size }}
            ></div>
        </div>
    );
};

export default LoadingSpinner;
