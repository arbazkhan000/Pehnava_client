import * as LucideIcons from "lucide-react";
import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import ProductCard from "./products/ProductCard";
import { useEffect, useState } from "react";

const CategoryShowcase = () => {
    const { fetchCategoriesProducts, loading } = useProduct();
    const [categoriesProducts, setCategoriesProducts] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCategoriesProducts();
            setCategoriesProducts(data);
        };
        fetchData();
    }, [fetchCategoriesProducts]);

    if (loading) return <div>Loading...</div>;
    if (!categoriesProducts || categoriesProducts.length === 0)
        return <div>No data available.</div>;

   return (
       <section className="mx-4 sm:mx-8 my-6 sm:my-8">
           {categoriesProducts.map((category) =>
               category.products.length === 0 ? null : ( 
                   <div key={category._id} className="mb-10">
                       <div className="flex justify-between items-center mb-4 px-2 sm:px-0">
                           <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                               {category.name}
                           </h2>
                           <Link
                               to={`/category/${category.slug}`}
                               className="text-xs sm:text-sm  hover:underline flex items-center gap-1"
                           >
                               View All{" "}
                               <LucideIcons.ArrowRight className="w-4 h-4" />
                           </Link>
                       </div>

                       <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                           {category.products.map((product) => (
                               <ProductCard
                                   key={product._id}
                                   product={product}
                               />
                           ))}
                       </div>
                   </div>
               )
           )}
       </section>
   );

};

export default CategoryShowcase;
