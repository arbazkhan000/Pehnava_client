import { Card, CardHeader } from "@/components/ui/card";
import { categories } from "@/data/mockData";



const CategoriesSection = () => {
    return (
        <section className="py-12 px-4 sm:px-6 md:px-10 ">
            <h2 className="text-3xl font-bold mb-8 text-center">
                Heartmade Collection
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <Card
                        key={cat.id}
                        className="overflow-hidden w-full aspect-[3/4] border-brand"
                    >
                        <CardHeader className="w-full h-full p-0">
                            <img
                                src={cat.image}
                                alt={`Category ${cat.id}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;
