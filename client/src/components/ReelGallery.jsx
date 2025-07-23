const reelsData = [
    {
        videoUrl: "https://cdn.example.com/reels/video1.mp4",
        caption: "Elegant Peach Suit",
        relatedProductSlug: "peach-embroidered-suit",
    },
    {
        videoUrl: "https://cdn.example.com/reels/video2.mp4",
        caption: "Chikankari Kurti Vibes",
        relatedProductSlug: "white-chikankari-kurti",
    },
];

export const ReelGallery = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-xl font-semibold text-center mb-6">
                Shop From Our Instagram Reels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {reelsData.map((reel, idx) => (
                    <div
                        key={idx}
                        className="rounded-xl overflow-hidden shadow-md"
                    >
                        <video
                            src={reel.videoUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-72 object-cover"
                        />
                        <div className="p-4 text-center">
                            <p className="font-medium">{reel.caption}</p>
                            <a
                                href={`/products/${reel.relatedProductSlug}`}
                                className="inline-block mt-2 px-4 py-1 bg-brand text-white rounded-full text-sm hover:bg-brand"
                            >
                                Shop This Look
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
