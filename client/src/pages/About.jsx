import React from "react";

const About = () => {
    return (
        <section className="px-6 md:px-12 lg:px-32 py-16  ">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
                    About <span className="text-brand">The Pehnava Core</span>
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                    We know the struggle of finding those Pinteresty
                    outfits—trendy, minimal, and still comfortable. The kind you
                    save on your moodboard but can never find in stores—or if
                    you do, they’re way too expensive.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                    That’s exactly why <strong>The Pehnava Core</strong> came to
                    life.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                    We’re here to create effortless Indo-Western outfits that
                    look like they’re straight out of your Pinterest board and
                    feel as good as they look. Elegant, easy to wear, and made
                    for real life—not just the ‘gram.
                </p>
                <p className="text-lg leading-relaxed">
                    Because you shouldn’t have to choose between{" "}
                    <strong>style</strong>, <strong>comfort</strong>, and{" "}
                    <strong>price</strong>. And now, you don’t have to.
                </p>
            </div>
        </section>
    );
};

export default About;
