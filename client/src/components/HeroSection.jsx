import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { girlsClothing } from "@/data/mockData";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

    return (
        <div className="relative overflow-hidden">
            <Carousel
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent>
                    {girlsClothing.map((item, index) => (
                        <CarouselItem key={index}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] relative"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title || `Slide ${index + 1}`}
                                    className="w-full h-full object-cover object-center"
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    {item.title && (
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay: 0.3,
                                                duration: 0.6,
                                            }}
                                            className="text-white text-center p-4"
                                        >
                                            <h2 className="text-3xl md:text-5xl font-bold mb-2">
                                                {item.title}
                                            </h2>
                                            {item.description && (
                                                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                                                    {item.description}
                                                </p>
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Arrows */}
                <CarouselPrevious className="left-4 hidden sm:flex" />
                <CarouselNext className="right-4 hidden sm:flex" />

                {/* Dots Navigation */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                    {girlsClothing.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => plugin.current.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition"
                        />
                    ))}
                </div>
            </Carousel>
        </div>
    );
};

export default HeroSection;
