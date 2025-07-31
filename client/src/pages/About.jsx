import { motion } from "framer-motion";

const About = () => {
    return (
        <section className="px-6 md:px-12 lg:px-32 py-20 text-foreground">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center space-y-6 text-foreground"
            >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                    About{" "}
                    <span className="text-foreground/90">The Pehnava Core</span>
                </h2>

                <p className="text-base md:text-lg leading-relaxed ">
                    We know the struggle of finding those Pinteresty
                    outfits—trendy, minimal, and still comfortable. The kind you
                    save on your moodboard but can never find in stores—or if
                    you do, they’re way too expensive.
                </p>

                <p className="text-base md:text-lg leading-relaxed text-foreground">
                    That’s exactly why{" "}
                    <strong className="font-semibold text-brand">
                        The Pehnava Core
                    </strong>{" "}
                    came to life.
                </p>

                <p className="text-base md:text-lg leading-relaxed ">
                    We’re here to create effortless Indo-Western outfits that
                    look like they’re straight out of your Pinterest board and
                    feel as good as they look. Elegant, easy to wear, and made
                    for real life—not just the ‘gram.
                </p>

                <p className="text-base md:text-lg leading-relaxed">
                    Because you shouldn’t have to choose between{" "}
                    <strong className="text-brand">style</strong>,{" "}
                    <strong className="text-brand">comfort</strong>, and{" "}
                    <strong className="text-brand">price</strong>. And now, you
                    don’t have to.
                </p>
            </motion.div>
        </section>
    );
};

export default About;
