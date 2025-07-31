// App.tsx
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";
import PreNavbar from "./components/PreNavbar";
import SocialSidebar from "./components/SocialSidebar";

// Lazy-loaded components
const Index = lazy(() => import("./pages/Index"));
const ProductDetails = lazy(() =>
    import("./components/products/ProductsDetails")
);
const Cart = lazy(() => import("./components/cart/Cart"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

import { useEffect } from "react";
import AdminDashboard from "./components/admin/AdminDashboard";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminOrder from "./components/admin/AdminOrders";
import AdminProducts from "./components/admin/AdminProducts ";
import Users from "./components/admin/Users";
import CategoryProducts from "./pages/CategoryProducts";
import SearchPage from "./pages/SearchPage";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    const location = useLocation();

    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
        <div className="bg-background min-h-screen flex flex-col">
            {!isAdminRoute && (
                <>
                    <PreNavbar />
                    <Navbar />
                </>
            )}
            <ScrollToTop />

            <main className="flex-grow">
                <Suspense fallback={<LoadingSpinner fullScreen />}>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route
                            path="/category/:slug"
                            element={<CategoryProducts />}
                        />
                        <Route
                            path="/product/:slug"
                            element={<ProductDetails />}
                        />

                        {/* <Route path="/cart" element={<Cart />} /> */}
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                        <Route path="/search/:query" element={<SearchPage />} />

                        <Route path="/admin" element={<AdminLayout />}>
                            <Route
                                index
                                element={<Navigate to="dashboard" />}
                            />
                            <Route
                                path="dashboard"
                                element={<AdminDashboard />}
                            />
                            <Route
                                path="products"
                                element={<AdminProducts />}
                            />
                            <Route path="orders" element={<AdminOrder />} />
                            <Route path="users" element={<Users />} />
                        </Route>
                    </Routes>
                </Suspense>
            </main>

            {!isAdminRoute && (
                <>
                    <Footer />
                    <SocialSidebar />
                </>
            )}
        </div>
    );
}

export default App;
