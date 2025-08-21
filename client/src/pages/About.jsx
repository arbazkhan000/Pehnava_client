import { motion } from "framer-motion";

const aboutContent = [
    "We know the struggle of finding those Pinteresty outfits—trendy, minimal, and still comfortable.",
    "That’s exactly why The Pehnava Core came to life.",
    "We’re here to create effortless Indo-Western outfits that look like they’re straight out of your Pinterest board.",
    "Because you shouldn’t have to choose between style, comfort, and price.",
];

const About = () => {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="px-6 md:px-12 lg:px-32 py-20">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="max-w-3xl mx-auto text-center space-y-6"
            >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                    About{" "}
                    <span className="text-foreground/90">The Pehnava Core</span>
                </h2>

                {aboutContent.map((paragraph, idx) => (
                    <motion.p
                        key={idx}
                        className="text-base md:text-lg leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                    >
                        {paragraph}
                    </motion.p>
                ))}
            </motion.div>
        </section>
    );
};

export default About;
