import {
    categories,
    categoriesProducts,
    girlsClothing,
    products,
} from "@/data/mockData";
import { createContext, useContext } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    return (
        <ProductContext.Provider
            value={{
                categories,
                products,
                girlsClothing,
                categoriesProducts,
            }}
        >
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
