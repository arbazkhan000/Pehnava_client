import AdminProducts from "../admin/AdminProducts ";
import AdminOrders from "../admin/AdminOrders";

const AdminDashboard = () => {
    return (
        <div className="space-y-6 md:space-y-8">
            <section className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-xl font-semibold mb-4 md:text-2xl">
                    Products
                </h2>
                <AdminProducts preview /> {/* optional preview mode */}
            </section>

            <section className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-xl font-semibold mb-4 md:text-2xl">
                    Orders
                </h2>
                <AdminOrders preview /> {/* optional preview mode */}
            </section>
        </div>
    );
};

export default AdminDashboard;
