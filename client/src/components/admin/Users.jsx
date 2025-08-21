import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Search,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Users as UsersIcon,
    UserCheck,
    UserX,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Shield,
    Crown,
    User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Initial users data
const initialUsers = [
    {
        id: "1",
        name: "Olivia Smith",
        email: "olivia@example.com",
        phone: "+1 (555) 123-4567",
        role: "user",
        status: "active",
        joinDate: "2023-01-15",
        lastLogin: "2024-01-15",
        totalOrders: 12,
        totalSpent: 1299.99,
        address: "123 Main St, New York, NY 10001",
    },
    {
        id: "2",
        name: "Jackson Lee",
        email: "jackson@example.com",
        phone: "+1 (555) 234-5678",
        role: "admin",
        status: "active",
        joinDate: "2022-06-10",
        lastLogin: "2024-01-15",
        totalOrders: 8,
        totalSpent: 899.99,
        address: "456 Oak Ave, Los Angeles, CA 90210",
    },
    {
        id: "3",
        name: "Isabella Nguyen",
        email: "isabella@example.com",
        phone: "+1 (555) 345-6789",
        role: "moderator",
        status: "active",
        joinDate: "2023-03-22",
        lastLogin: "2024-01-14",
        totalOrders: 15,
        totalSpent: 2099.99,
        address: "789 Pine Rd, Chicago, IL 60601",
    },
    {
        id: "4",
        name: "William Kim",
        email: "will@example.com",
        phone: "+1 (555) 456-7890",
        role: "user",
        status: "inactive",
        joinDate: "2023-08-05",
        lastLogin: "2023-12-20",
        totalOrders: 3,
        totalSpent: 299.99,
        address: "321 Elm St, Miami, FL 33101",
    },
    {
        id: "5",
        name: "Sofia Davis",
        email: "sofia@example.com",
        role: "user",
        status: "suspended",
        joinDate: "2023-11-12",
        lastLogin: "2024-01-10",
        totalOrders: 1,
        totalSpent: 49.99,
        address: "654 Maple Dr, Seattle, WA 98101",
    },
];

export default function Users() {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        phone: "",
        role: "user",
        status: "active",
        address: "",
    });

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        const matchesStatus =
            statusFilter === "all" || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const handleAddUser = () => {
        if (newUser.name && newUser.email) {
            setUsers([
                ...users,
                {
                    ...newUser,
                    id: (users.length + 1).toString(),
                    joinDate: new Date().toISOString().split("T")[0],
                    lastLogin: new Date().toISOString().split("T")[0],
                    totalOrders: 0,
                    totalSpent: 0,
                },
            ]);
            setNewUser({
                name: "",
                email: "",
                phone: "",
                role: "user",
                status: "active",
                address: "",
            });
            setIsAddDialogOpen(false);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setNewUser(user);
    };

    const handleUpdateUser = () => {
        if (editingUser && newUser.name && newUser.email) {
            setUsers(
                users.map((u) =>
                    u.id === editingUser.id ? { ...editingUser, ...newUser } : u
                )
            );
            setEditingUser(null);
            setNewUser({
                name: "",
                email: "",
                phone: "",
                role: "user",
                status: "active",
                address: "",
            });
        }
    };

    const handleDeleteUser = (id) =>
        setUsers(users.filter((u) => u.id !== id));

    const updateUserStatus = (userId, newStatus) => {
        setUsers(
            users.map((u) =>
                u.id === userId ? { ...u, status: newStatus } : u
            )
        );
    };

    const getRoleIcon = (role) =>
        role === "admin" ? (
            <Crown className="h-4 w-4" />
        ) : role === "moderator" ? (
            <Shield className="h-4 w-4" />
        ) : (
            <User className="h-4 w-4" />
        );

    const getRoleBadgeVariant = (role) =>
        role === "admin"
            ? "default"
            : role === "moderator"
            ? "secondary"
            : "outline";
    const getStatusBadgeVariant = (status) =>
        status === "active"
            ? "default"
            : status === "inactive"
            ? "secondary"
            : "destructive";

    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "active").length;
    const totalRevenue = users.reduce((sum, user) => sum + user.totalSpent, 0);
    const adminUsers = users.filter((u) => u.role === "admin").length;

    return (
        <div className="flex flex-col space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">
                        Manage user accounts and permissions
                    </p>
                </div>
            </div>

            {/* Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex justify-between">
                        <CardTitle>Total Users</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            {activeUsers} active users
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex justify-between">
                        <CardTitle>Total Revenue</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${totalRevenue.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex justify-between">
                        <CardTitle>Active Users</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeUsers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex justify-between">
                        <CardTitle>Admins</CardTitle>
                        <Crown className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{adminUsers}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
