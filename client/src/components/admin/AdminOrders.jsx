import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    CheckCircle,
    Clock,
    DollarSign,
    Download,
    Eye,
    Filter,
    MoreHorizontal,
    Package,
    Search,
    TrendingUp,
    Truck,
    XCircle,
} from "lucide-react";
import { useState } from "react";

const initialOrders = [
    {
        id: "ORD-001",
        customerName: "Olivia Smith",
        customerEmail: "olivia@example.com",
        items: [
            { name: "Wireless Headphones", quantity: 1, price: 99.99 },
            { name: "USB-C Hub", quantity: 2, price: 49.99 },
        ],
        total: 199.97,
        status: "delivered",
        orderDate: "2024-01-15",
        shippingAddress: "123 Main St, New York, NY 10001",
        paymentMethod: "Credit Card",
    },
    {
        id: "ORD-002",
        customerName: "Jackson Lee",
        customerEmail: "jackson@example.com",
        items: [{ name: "Smart Watch", quantity: 1, price: 299.99 }],
        total: 299.99,
        status: "processing",
        orderDate: "2024-01-14",
        shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
        paymentMethod: "PayPal",
    },
    {
        id: "ORD-003",
        customerName: "Isabella Nguyen",
        customerEmail: "isabella@example.com",
        items: [
            { name: "Laptop Stand", quantity: 1, price: 29.99 },
            { name: "Bluetooth Speaker", quantity: 1, price: 79.99 },
        ],
        total: 109.98,
        status: "shipped",
        orderDate: "2024-01-13",
        shippingAddress: "789 Pine Rd, Chicago, IL 60601",
        paymentMethod: "Credit Card",
    },
    {
        id: "ORD-004",
        customerName: "William Kim",
        customerEmail: "will@example.com",
        items: [{ name: "Wireless Headphones", quantity: 2, price: 99.99 }],
        total: 199.98,
        status: "pending",
        orderDate: "2024-01-12",
        shippingAddress: "321 Elm St, Miami, FL 33101",
        paymentMethod: "Credit Card",
    },
    {
        id: "ORD-005",
        customerName: "Sofia Davis",
        customerEmail: "sofia@example.com",
        items: [{ name: "USB-C Hub", quantity: 1, price: 49.99 }],
        total: 49.99,
        status: "cancelled",
        orderDate: "2024-01-11",
        shippingAddress: "654 Maple Dr, Seattle, WA 98101",
        paymentMethod: "PayPal",
    },
];

export default function AdminOrders() {
    const [orders, setOrders] = useState(initialOrders);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            order.customerEmail
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <Clock className="h-4 w-4" />;
            case "processing":
                return <Package className="h-4 w-4" />;
            case "shipped":
                return <Truck className="h-4 w-4" />;
            case "delivered":
                return <CheckCircle className="h-4 w-4" />;
            case "cancelled":
                return <XCircle className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
        }
    };

    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case "pending":
                return "outline";
            case "processing":
                return "secondary";
            case "shipped":
                return "default";
            case "delivered":
                return "default";
            case "cancelled":
                return "destructive";
            default:
                return "outline";
        }
    };

    const totalOrders = orders.length;
    const totalRevenue = orders
        .filter((o) => o.status !== "cancelled")
        .reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter((o) => o.status === "pending").length;
    const deliveredOrders = orders.filter(
        (o) => o.status === "delivered"
    ).length;

    return (
        <>
            <div className="flex flex-col space-y-8 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Orders
                        </h1>
                        <p className="text-muted-foreground">
                            Track and manage customer orders and fulfillment
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Orders
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalOrders}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {pendingOrders} pending orders
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${totalRevenue.toFixed(2)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                From{" "}
                                {totalOrders -
                                    orders.filter(
                                        (o) => o.status === "cancelled"
                                    ).length}{" "}
                                orders
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Delivered
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {deliveredOrders}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {(
                                    (deliveredOrders / totalOrders) *
                                    100
                                ).toFixed(1)}
                                % completion rate
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Average Order
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                $
                                {(totalRevenue / (totalOrders || 1)).toFixed(2)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Per order value
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="all">All Orders</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="processing">Processing</TabsTrigger>
                        <TabsTrigger value="shipped">Shipped</TabsTrigger>
                        <TabsTrigger value="delivered">Delivered</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Management</CardTitle>
                                <CardDescription>
                                    View and manage all customer orders
                                </CardDescription>
                                <div className="flex items-center space-x-2">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search orders, customers..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="max-w-sm"
                                    />
                                    <Select
                                        value={statusFilter}
                                        onValueChange={setStatusFilter}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                All Statuses
                                            </SelectItem>
                                            <SelectItem value="pending">
                                                Pending
                                            </SelectItem>
                                            <SelectItem value="processing">
                                                Processing
                                            </SelectItem>
                                            <SelectItem value="shipped">
                                                Shipped
                                            </SelectItem>
                                            <SelectItem value="delivered">
                                                Delivered
                                            </SelectItem>
                                            <SelectItem value="cancelled">
                                                Cancelled
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Order</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredOrders.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium">
                                                    {order.id}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage
                                                                src={
                                                                    order.customerAvatar
                                                                }
                                                            />
                                                            <AvatarFallback>
                                                                {order.customerName
                                                                    .split(" ")
                                                                    .map(
                                                                        (n) =>
                                                                            n[0]
                                                                    )
                                                                    .join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">
                                                                {
                                                                    order.customerName
                                                                }
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                {
                                                                    order.customerEmail
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        order.orderDate
                                                    ).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={getStatusBadgeVariant(
                                                            order.status
                                                        )}
                                                    >
                                                        <span className="flex items-center gap-1">
                                                            {getStatusIcon(
                                                                order.status
                                                            )}
                                                            {order.status}
                                                        </span>
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    ${order.total.toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>
                                                                Actions
                                                            </DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    setSelectedOrder(
                                                                        order
                                                                    )
                                                                }
                                                            >
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    updateOrderStatus(
                                                                        order.id,
                                                                        "processing"
                                                                    )
                                                                }
                                                                disabled={
                                                                    order.status ===
                                                                    "processing"
                                                                }
                                                            >
                                                                Mark as
                                                                Processing
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    updateOrderStatus(
                                                                        order.id,
                                                                        "shipped"
                                                                    )
                                                                }
                                                                disabled={
                                                                    order.status ===
                                                                        "shipped" ||
                                                                    order.status ===
                                                                        "delivered"
                                                                }
                                                            >
                                                                Mark as Shipped
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    updateOrderStatus(
                                                                        order.id,
                                                                        "delivered"
                                                                    )
                                                                }
                                                                disabled={
                                                                    order.status ===
                                                                    "delivered"
                                                                }
                                                            >
                                                                Mark as
                                                                Delivered
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    updateOrderStatus(
                                                                        order.id,
                                                                        "cancelled"
                                                                    )
                                                                }
                                                                className="text-red-600"
                                                                disabled={
                                                                    order.status ===
                                                                        "delivered" ||
                                                                    order.status ===
                                                                        "cancelled"
                                                                }
                                                            >
                                                                Cancel Order
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {["pending", "processing", "shipped", "delivered"].map(
                        (status) => (
                            <TabsContent
                                key={status}
                                value={status}
                                className="space-y-4"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="capitalize">
                                            {status} Orders
                                        </CardTitle>
                                        <CardDescription>
                                            Orders with {status} status
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Order</TableHead>
                                                    <TableHead>
                                                        Customer
                                                    </TableHead>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Total</TableHead>
                                                    <TableHead></TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {orders
                                                    .filter(
                                                        (order) =>
                                                            order.status ===
                                                            status
                                                    )
                                                    .map((order) => (
                                                        <TableRow
                                                            key={order.id}
                                                        >
                                                            <TableCell className="font-medium">
                                                                {order.id}
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center space-x-3">
                                                                    <Avatar className="h-8 w-8">
                                                                        <AvatarFallback>
                                                                            {order.customerName
                                                                                .split(
                                                                                    " "
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        n
                                                                                    ) =>
                                                                                        n[0]
                                                                                )
                                                                                .join(
                                                                                    ""
                                                                                )}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div>
                                                                        <div className="font-medium">
                                                                            {
                                                                                order.customerName
                                                                            }
                                                                        </div>
                                                                        <div className="text-sm text-muted-foreground">
                                                                            {
                                                                                order.customerEmail
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                {new Date(
                                                                    order.orderDate
                                                                ).toLocaleDateString()}
                                                            </TableCell>
                                                            <TableCell>
                                                                $
                                                                {order.total.toFixed(
                                                                    2
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        setSelectedOrder(
                                                                            order
                                                                        )
                                                                    }
                                                                >
                                                                    View
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        )
                    )}
                </Tabs>

                {selectedOrder && (
                    <Dialog
                        open={!!selectedOrder}
                        onOpenChange={() => setSelectedOrder(null)}
                    >
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>
                                    Order Details - {selectedOrder.id}
                                </DialogTitle>
                                <DialogDescription>
                                    Complete order information and tracking
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-medium mb-2">
                                            Customer Information
                                        </h4>
                                        <div className="space-y-1 text-sm">
                                            <p>
                                                <strong>Name:</strong>{" "}
                                                {selectedOrder.customerName}
                                            </p>
                                            <p>
                                                <strong>Email:</strong>{" "}
                                                {selectedOrder.customerEmail}
                                            </p>
                                            <p>
                                                <strong>Payment:</strong>{" "}
                                                {selectedOrder.paymentMethod}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">
                                            Order Information
                                        </h4>
                                        <div className="space-y-1 text-sm">
                                            <p>
                                                <strong>Date:</strong>{" "}
                                                {new Date(
                                                    selectedOrder.orderDate
                                                ).toLocaleDateString()}
                                            </p>
                                            <p>
                                                <strong>Status:</strong>
                                                <Badge
                                                    variant={getStatusBadgeVariant(
                                                        selectedOrder.status
                                                    )}
                                                    className="ml-2"
                                                >
                                                    {selectedOrder.status}
                                                </Badge>
                                            </p>
                                            <p>
                                                <strong>Total:</strong> $
                                                {selectedOrder.total.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-2">
                                        Shipping Address
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {selectedOrder.shippingAddress}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-medium mb-2">
                                        Order Items
                                    </h4>
                                    <div className="border rounded-lg">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>
                                                        Product
                                                    </TableHead>
                                                    <TableHead>
                                                        Quantity
                                                    </TableHead>
                                                    <TableHead>Price</TableHead>
                                                    <TableHead>Total</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {selectedOrder.items.map(
                                                    (item, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                {item.name}
                                                            </TableCell>
                                                            <TableCell>
                                                                {item.quantity}
                                                            </TableCell>
                                                            <TableCell>
                                                                $
                                                                {item.price.toFixed(
                                                                    2
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                $
                                                                {(
                                                                    item.quantity *
                                                                    item.price
                                                                ).toFixed(2)}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </>
    );
}
