import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const sidebarItems = [
    { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Products", href: "/admin/products", icon: LayoutDashboard },
    { title: "Orders", href: "/admin/orders", icon: LayoutDashboard },
    { title: "Users", href: "/admin/users", icon: LayoutDashboard },
    { title: "Add", href: "/admin/add", icon: LayoutDashboard },
];

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const user = { name: "Admin" }; // Replace with auth context

    const SidebarContent = () => (
        <div className="flex h-full flex-col bg-white text-black">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                    to="/"
                    className="flex items-center gap-2 font-semibold text-black"
                >
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <LayoutDashboard className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg">Admin Panel</span>
                </Link>
            </div>
            <ScrollArea className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4">
                    {sidebarItems.map((item) => {
                        const isActive = location.pathname.startsWith(
                            item.href
                        );
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 transition-all",
                                    isActive && "bg-gray-100 font-semibold"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </ScrollArea>
        </div>
    );

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r md:block">
                <SidebarContent />
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:h-[60px] lg:px-6">
                    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="flex flex-col p-0 overflow-y-auto"
                        >
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>

                    <form className="w-full max-w-sm">
                        <div className="relative">
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full pl-8 border border-gray-300 bg-white"
                            />
                        </div>
                    </form>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                        {user.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 lg:gap-6 lg:p-8 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
