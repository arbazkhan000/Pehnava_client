
// Example static cart items
const cartItems = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 499,
    quantity: 2,
    image: "https://via.placeholder.com/60x60.png?text=Item+1",
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 1299,
    quantity: 1,
    image: "https://via.placeholder.com/60x60.png?text=Item+2",
  },
];

const Cart = () => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 py-16">Your cart is empty.</div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center bg-white rounded-lg shadow p-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-gray-500 text-sm">₹{item.price} x {item.quantity}</div>
                </div>
                <div className="font-bold mr-4">₹{item.price * item.quantity}</div>
                <button className="text-red-500 hover:underline text-sm">Remove</button>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-end">
            <div className="text-lg font-semibold mb-2">Subtotal: ₹{subtotal}</div>
            <button className="bg-brand text-white px-6 py-2 rounded hover:bg-brand-dark transition">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;