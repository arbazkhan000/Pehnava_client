/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        // Include shadcn ui components if using
        "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            colors: {
                background: "#FDF2F2", // Your desired background color (example, you can change)
                foreground: "#8F1918", // Text color you asked for
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.5rem",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
