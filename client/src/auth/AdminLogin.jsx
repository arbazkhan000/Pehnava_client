// import { Button } from "@/components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import { useAuth } from "@/context/AppContext";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { z } from "zod";

// // Form validation schema
// const formSchema = z.object({
//     email: z
//         .string()
//         .email("Invalid email address")
//         .min(1, "Email is required"),
//     password: z
//         .string()
//         .min(1, "Password is required")
//         .min(8, "Password must be at least 8 characters"),
// });

// const AdminLogin = () => {
//     const { toast } = useToast();
//     const { adminLogin } = useAuth();
//     const navigate = useNavigate();

//     const form =
//         useForm <
//         z.infer <
//         typeof formSchema >>
//             {
//                 resolver: zodResolver(formSchema),
//                 defaultValues: {
//                     email: "",
//                     password: "",
//                 },
//             };

//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         try {
//             await adminLogin(values.email, values.password);
//             navigate("/admin/dashboard");
//             toast({
//                 title: "Login successful",
//                 description: "Welcome back, Admin!",
//             });
//         } catch (error) {
//             toast({
//                 title: "Login failed",
//                 description: error.message || "Invalid credentials",
//                 variant: "destructive",
//             });
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
//             <div className="w-full max-w-md">
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
//                     <div className="p-8">
//                         <div className="text-center mb-8">
//                             <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//                                 Admin Portal
//                             </h1>
//                             <p className="text-gray-500 dark:text-gray-400">
//                                 Sign in to access the dashboard
//                             </p>
//                         </div>

//                         <Form {...form}>
//                             <form
//                                 onSubmit={form.handleSubmit(onSubmit)}
//                                 className="space-y-6"
//                             >
//                                 <FormField
//                                     control={form.control}
//                                     name="email"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Email</FormLabel>
//                                             <FormControl>
//                                                 <Input
//                                                     placeholder="admin@example.com"
//                                                     type="email"
//                                                     autoComplete="username"
//                                                     {...field}
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 <FormField
//                                     control={form.control}
//                                     name="password"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <div className="flex items-center justify-between">
//                                                 <FormLabel>Password</FormLabel>
//                                                 <button
//                                                     type="button"
//                                                     className="text-sm font-medium text-brand hover:text-brand/80"
//                                                     onClick={() =>
//                                                         navigate(
//                                                             "/admin/forgot-password"
//                                                         )
//                                                     }
//                                                 >
//                                                     Forgot password?
//                                                 </button>
//                                             </div>
//                                             <FormControl>
//                                                 <Input
//                                                     placeholder="••••••••"
//                                                     type="password"
//                                                     autoComplete="current-password"
//                                                     {...field}
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 <Button
//                                     type="submit"
//                                     className="w-full"
//                                     disabled={form.formState.isSubmitting}
//                                 >
//                                     {form.formState.isSubmitting ? (
//                                         <>
//                                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                             Signing in...
//                                         </>
//                                     ) : (
//                                         "Sign In"
//                                     )}
//                                 </Button>
//                             </form>
//                         </Form>

//                         <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
//                             <p>
//                                 Not an admin?{" "}
//                                 <button
//                                     type="button"
//                                     className="font-medium text-brand hover:text-brand/80"
//                                     onClick={() => navigate("/")}
//                                 >
//                                     Return to main site
//                                 </button>
//                             </p>
//                         </div>
//                     </div>

//                     <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
//                         <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
//                             By signing in, you agree to our{" "}
//                             <button
//                                 type="button"
//                                 className="font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//                                 onClick={() => navigate("/terms")}
//                             >
//                                 Terms of Service
//                             </button>{" "}
//                             and{" "}
//                             <button
//                                 type="button"
//                                 className="font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//                                 onClick={() => navigate("/privacy")}
//                             >
//                                 Privacy Policy
//                             </button>
//                             .
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminLogin;
