// App.tsx
import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from "./components/Navbar";
import PreNavbar from "./components/PreNavbar";
import SocialSidebar from "./components/SocialSidebar";
import Checkout from "./components/cart/Checkout";

// Lazy-loaded public pages
const Index = lazy(() => import("./pages/Index"));
const ProductDetails = lazy(() =>
    import("./components/products/ProductsDetails")
);
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CategoryProducts = lazy(() => import("./pages/CategoryProducts"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Login = lazy(() => import("./auth/Login"));
const Register = lazy(() => import("./auth/Register"));

// Lazy-loaded admin pages
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("./components/admin/AdminProducts "));
const AdminOrders = lazy(() => import("./components/admin/AdminOrders"));
const Users = lazy(() => import("./components/admin/Users"));
const Add = lazy(() => import("./components/admin/Add"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));

// ScrollToTop component
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

// Admin route protection
// Admin route protection
const AdminProtected = ({ children }) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;

    if (!token || !user || user.role !== "admin") {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};


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
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<LoadingSpinner fullScreen />}>
                                <Index />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/category/:slug"
                        element={
                            <Suspense fallback={<LoadingSpinner fullScreen />}>
                                <CategoryProducts />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/product/:slug"
                        element={
                            <Suspense fallback={<LoadingSpinner fullScreen />}>
                                <ProductDetails />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <Suspense fallback={<LoadingSpinner fullScreen />}>
                                <About />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <Suspense fallback={<LoadingSpinner fullScreen />}>
                                <Contact />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/search/:query"
                        element={
                            <Suspense fallback={<LoadingSpinner fullScreen />}>
                                <SearchPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Suspense fallback={<LoadingSpinner fullScreen />}>
                                <Login />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Suspense fallback={<LoadingSpinner fullScreen />}>
                                <Register />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <Suspense fallback={<LoadingSpinner fullScreen />}>
                                <Checkout />
                            </Suspense>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Suspense fallback={<LoadingSpinner fullScreen />}>
                                <NotFound />
                            </Suspense>
                        }
                    />

                    {/* Admin Routes */}
                    <Route
                        path="/admin"
                        element={
                            <AdminProtected>
                                <Suspense
                                    fallback={<LoadingSpinner fullScreen />}
                                >
                                    <AdminLayout />
                                </Suspense>
                            </AdminProtected>
                        }
                    >
                        <Route
                            index
                            element={<Navigate to="dashboard" replace />}
                        />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="orders" element={<AdminOrders />} />
                        <Route path="users" element={<Users />} />
                        <Route path="add" element={<Add />} />
                    </Route>
                </Routes>
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
