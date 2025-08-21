import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const AdminProducts = ({ preview = false }) => {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Sample products (replace with API)
    const products = [
        {
            name: "Stylish Dress",
            price: "₹999",
            stock: 23,
            category: "Dresses",
            image: "",
        },
        {
            name: "Blue Kurti",
            price: "₹799",
            stock: 10,
            category: "Kurtis",
            image: "",
        },
        {
            name: "Casual T-shirt",
            price: "₹599",
            stock: 40,
            category: "Tops",
            image: "",
        },
    ];

    if (preview) return null; // Skip table for dashboard preview

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-semibold">
                        All Products
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage your product listings and inventory.
                    </p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="hidden md:inline">
                                Add Product
                            </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl w-[90vw] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Add Product</DialogTitle>
                        </DialogHeader>
                        <form className="grid grid-cols-1 gap-4 mt-4">
                            <Input placeholder="Product Name" />
                            <Input placeholder="Price" type="number" />
                            <Input placeholder="Category" />
                            <Input placeholder="Stock" type="number" />
                            <Input placeholder="Image URL" />
                            <Button type="submit" className="w-full">
                                Add Product
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 hidden md:table-cell">Image</th>
                            <th className="p-3 font-medium">Name</th>
                            <th className="p-3 font-medium">Price</th>
                            <th className="p-3 font-medium hidden sm:table-cell">
                                Stock
                            </th>
                            <th className="p-3 font-medium hidden lg:table-cell">
                                Category
                            </th>
                            <th className="p-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products
                            .filter((p) =>
                                p.name
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                            )
                            .map((product, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="p-3 hidden md:table-cell">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-12 w-12 rounded-md object-cover"
                                        />
                                    </td>
                                    <td className="p-3">{product.name}</td>
                                    <td className="p-3">{product.price}</td>
                                    <td className="p-3 hidden sm:table-cell">
                                        {product.stock}
                                    </td>
                                    <td className="p-3 hidden lg:table-cell">
                                        {product.category}
                                    </td>
                                    <td className="p-3 flex gap-2">
                                        <Button size="sm" variant="outline">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
