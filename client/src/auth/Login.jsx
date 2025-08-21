import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AppContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { login, loading, error } = useAuth();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(formData.email, formData.password);

        if (success) {
            navigate("/"); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="border border-foreground outline-none focus:ring-2 focus:ring-foreground/70 rounded transition-colors"
                            />
                        </div>

                        {/* Password Field */}
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

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-600 text-center text-sm">
                                {error}
                            </p>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-foreground text-white hover:bg-foreground/80 transition-colors"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                        {/* Signup Link */}
                        <div className="text-center mt-2">
                            <p className="text-sm">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-foreground hover:underline font-medium"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
