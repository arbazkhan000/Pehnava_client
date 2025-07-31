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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DollarSign,
    Edit,
    Eye,
    MoreHorizontal,
    Package,
    Plus,
    Search,
    Trash2,
    TrendingUp,
} from "lucide-react";
import { useState } from "react";

const initialProducts = [
    {
        id: "1",
        name: "Wireless Headphones",
        category: "Electronics",
        price: 99.99,
        stock: 45,
        status: "active",
        description: "High-quality wireless headphones with noise cancellation",
        image: "/placeholder.svg",
    },
    // ... other initial products
];

export default function AdminProducts() {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        status: "active",
        description: "",
    });

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = () => {
        if (newProduct.name && newProduct.category && newProduct.price) {
            const product = {
                id: (products.length + 1).toString(),
                ...newProduct,
                image: "/placeholder.svg",
            };
            setProducts([...products, product]);
            resetForm();
            setIsAddDialogOpen(false);
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setNewProduct(product);
    };

    const handleUpdateProduct = () => {
        if (editingProduct && newProduct.name && newProduct.category) {
            setProducts(
                products.map((p) =>
                    p.id === editingProduct.id
                        ? { ...newProduct, id: editingProduct.id }
                        : p
                )
            );
            setEditingProduct(null);
            resetForm();
        }
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    const resetForm = () => {
        setNewProduct({
            name: "",
            category: "",
            price: 0,
            stock: 0,
            status: "active",
            description: "",
        });
    };

    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case "active":
                return "default";
            case "inactive":
                return "secondary";
            case "out-of-stock":
                return "destructive";
            default:
                return "outline";
        }
    };

    // Statistics calculations
    const totalProducts = products.length;
    const activeProducts = products.filter((p) => p.status === "active").length;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    const lowStockProducts = products.filter(
        (p) => p.stock < 10 && p.stock > 0
    ).length;
    const categoryCount = new Set(products.map((p) => p.category)).size;

    return (
        <>
            <div className="flex flex-col space-y-8 p-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Products
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your product inventory and catalog
                        </p>
                    </div>
                    <Dialog
                        open={isAddDialogOpen}
                        onOpenChange={setIsAddDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button className="w-full md:w-auto">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingProduct ? "Edit" : "Add"} Product
                                </DialogTitle>
                                <DialogDescription>
                                    {editingProduct ? "Update" : "Create"} a
                                    product in your inventory
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                {/* Form fields remain the same */}
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={
                                        editingProduct
                                            ? handleUpdateProduct
                                            : handleAddProduct
                                    }
                                >
                                    {editingProduct ? "Update" : "Add"} Product
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Products"
                        value={totalProducts}
                        icon={<Package />}
                        description={`${activeProducts} active`}
                    />
                    <StatCard
                        title="Total Value"
                        value={`$${totalValue.toLocaleString()}`}
                        icon={<DollarSign />}
                        description="Inventory value"
                    />
                    <StatCard
                        title="Low Stock"
                        value={lowStockProducts}
                        icon={<TrendingUp />}
                        description="Below 10 units"
                    />
                    <StatCard
                        title="Categories"
                        value={categoryCount}
                        icon={<Eye />}
                        description="Unique categories"
                    />
                </div>

                {/* Products Table */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <CardTitle>Product Inventory</CardTitle>
                                <CardDescription>
                                    Manage your product catalog and stock levels
                                </CardDescription>
                            </div>
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                                                    {product.image ? (
                                                        <img
                                                            src={product.image}
                                                            alt=""
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Package className="h-5 w-5" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground line-clamp-1">
                                                        {product.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {product.category}
                                        </TableCell>
                                        <TableCell>
                                            ${product.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={
                                                    product.stock === 0
                                                        ? "text-destructive"
                                                        : product.stock < 10
                                                        ? "text-warning"
                                                        : ""
                                                }
                                            >
                                                {product.stock}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={getStatusBadgeVariant(
                                                    product.status
                                                )}
                                            >
                                                {product.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
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
                                                            handleEditProduct(
                                                                product
                                                            )
                                                        }
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleDeleteProduct(
                                                                product.id
                                                            )
                                                        }
                                                        className="text-destructive"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
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
            </div>
        </>
    );
}

// Helper component for stats cards
function StatCard({ title, value, icon, description }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}
