import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AppContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <CartProvider>
                <ProductProvider>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </ProductProvider>
            </CartProvider>
        </BrowserRouter>
    </StrictMode>
);
