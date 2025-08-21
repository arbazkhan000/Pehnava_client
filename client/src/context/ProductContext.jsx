import { axiosInstance } from "@/utils/axiosInstance";
import { createContext, useCallback, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [categories, setCategories] = useState([]); // for category carousel
    const [products, setProducts] = useState([]); // for one category page
    const [categoriesProducts, setCategoriesProducts] = useState([]); // homepage rows
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //  Get all categories
    const getAllCategories = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/categories");
            setCategories(res.data?.categories || []);
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    // 2 Get products by category slug (for category page)
    const getProductsByCategory = useCallback(async (slug, page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get(
                `/products/category/${slug}?page=${page}`
            );
            setProducts(res.data?.products || []);
            return res.data; 
        } catch (err) {
            setError(
                err?.response?.data?.message || "Failed to fetch products"
            );
            setProducts([]);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // 3️ Get categories + first 4 products each (homepage)
    const fetchCategoriesProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/products/home");
            setCategoriesProducts(res.data?.categories || []);
            return res.data?.categories || [];
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong");
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    // 4️ Get products details

    const getProductsDetails = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/products");
            setProducts(res.data?.data || []);
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, []);

    // 5️ search products by name,slug,category
    const searchProducts = useCallback(async (search) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.get(
                `/products/search?search=${encodeURIComponent(search)}`
            );
            return {
                success: true,
                products: res.data?.data || [],
                total: res.data?.total || 0,
                message: res.data?.message || "Products found",
            };
        } catch (err) {
            setError(
                err?.response?.data?.message || "Failed to fetch products"
            );
            return {
                success: false,
                products: [],
                total: 0,
                message:
                    err?.response?.data?.message || "Failed to fetch products",
            };
        } finally {
            setLoading(false);
        }
    }, []);

    // 5 create products by name,slug,category

   const createProduct = useCallback(async (productData) => {
       setLoading(true);
       setError(null);
       try {
           const res = await axiosInstance.post("/products", productData, {
               headers: {
                   "Content-Type": "multipart/form-data",
               },
           });
           return {
               success: true,
               product: res.data?.data || null,
               message: res.data?.message || "Product created successfully",
           };
       } catch (err) {
           setError(err?.response?.data?.message || "Failed to create product");
           return {
               success: false,
               product: null,
               message:
                   err?.response?.data?.message || "Failed to create product",
           };
       } finally {
           setLoading(false);
       }
   }, []);


    const value = {
        categories,
        products,
        categoriesProducts,
        searchProducts,
        createProduct,
        getAllCategories,
        getProductsByCategory,
        fetchCategoriesProducts,
        getProductsDetails,
        loading,
        error,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
};
