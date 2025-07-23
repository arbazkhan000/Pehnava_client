import { featureProducts } from "@/data/mockData";
import React from "react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { ArrowRight } from "lucide-react";

const FeatureProducts = () => {
    return (
        <section className="py-12 px-4 sm:px-6 md:px-10">
            <h2 className="text-3xl font-bold mb-8 text-center">
                Realted Prodcuts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featureProducts.map((product) => (
                    <Card
                        key={product.id}
                        className="overflow-hidden w-full aspect-[3/4] border border-brand shadow-md hover:shadow-lg transition-shadow"
                    >
                        <CardHeader className="w-full h-[75%] p-0">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </CardHeader>

                        <CardContent className="flex items-center justify-between p-4">
                            <h3 className="text-lg font-semibold">
                                {product.title}
                            </h3>
                            <ArrowRight className="w-5 h-5 text-brand" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default FeatureProducts;
