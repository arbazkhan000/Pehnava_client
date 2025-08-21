import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AppContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const { register, loading, error } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(
            formData.name,
            formData.email,
            formData.password
        );

        if (success) {
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Create an Account
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="border border-foreground outline-none focus:ring-2 focus:ring-foreground/70 rounded transition-colors"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="border border-foreground outline-none focus:ring-2 focus:ring-foreground/70 rounded transition-colors"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="border border-foreground outline-none focus:ring-2 focus:ring-foreground/70 rounded transition-colors"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-red-600 text-start text-sm">
                                {error}
                            </p>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-foreground text-white hover:bg-foreground/80 transition-colors"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>

                        {/* Login Link */}
                        <p className="text-center text-sm mt-2">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-foreground hover:underline font-medium"
                            >
                                Sign In
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
