import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AppContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import "./index.css";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ProductProvider>
                    <AuthProvider>
                        <Toaster position="top-center" reverseOrder={false} />

                        <App />
                    </AuthProvider>
                </ProductProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
