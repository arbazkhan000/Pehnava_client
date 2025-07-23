import { Route, Routes } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PreNavbar from "./components/PreNavbar";
import ProductsDetails from "./components/products/ProductsDetails";
import Profile from "./components/profile/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <>
            <div className="bg-brand-background">
                <PreNavbar />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route
                        path="/product/:slug"
                        element={<ProductsDetails />}
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
}

export default App;
