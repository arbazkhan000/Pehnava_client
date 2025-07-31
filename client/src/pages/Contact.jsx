import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const Contact = () => {
    const { ref, inView } = useInView({ triggerOnce: true });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 2000); // Simulate send
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="min-h-[calc(100vh-64px)] py-12 px-6 sm:px-10 lg:px-24 bg-brand-background text-brand"
        >
            <h2 className="text-3xl font-bold mb-2 text-center">Contact Us</h2>
            <p className="text-muted-foreground mb-8 text-center max-w-xl mx-auto">
                Have questions, feedback, or just want to say hello? We'd love
                to hear from you!
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Contact Info */}
                <div className="space-y-8">
                    {/* Email */}
                    <div className="flex items-center">
                        <div className="p-3 bg-brand/10 text-brand rounded-full">
                            <Mail className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">Email</h3>
                            <p className="text-muted-foreground">
                                support@pehnava.com
                            </p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center">
                        <div className="p-3 bg-brand/10 text-brand rounded-full">
                            <Phone className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">Phone</h3>
                            <p className="text-muted-foreground">
                                +91 98765 43210
                            </p>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-center">
                        <div className="p-3 bg-brand/10 text-brand rounded-full">
                            <MapPin className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold">Address</h3>
                            <p className="text-muted-foreground">
                                Delhi, India
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium"
                        >
                            Name
                        </label>
                        <Input
                            id="name"
                            required
                            className="mt-1 border border-brand focus:ring-brand focus:border-brand rounded-lg"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            required
                            className="mt-1 border border-brand focus:ring-brand focus:border-brand rounded-lg"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium"
                        >
                            Message
                        </label>
                        <Textarea
                            id="message"
                            required
                            rows={5}
                            className="mt-1 border border-brand focus:ring-brand focus:border-brand rounded-lg"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand text-white hover:bg-brand/90"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </div>
        </motion.div>
    );
};

export default Contact;
