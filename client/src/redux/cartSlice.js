import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existing = state.cartItems.find(
                (i) => i.id === action.payload.id
            );
            if (existing) existing.quantity += 1;
            else state.cartItems.push({ ...action.payload, quantity: 1 });

            state.totalAmount = state.cartItems.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0
            );
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if (item) item.quantity += 1;
            state.totalAmount = state.cartItems.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0
            );
        },
        decrementQuantity: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
            else
                state.cartItems = state.cartItems.filter(
                    (i) => i.id !== action.payload
                );

            state.totalAmount = state.cartItems.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0
            );
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (i) => i.id !== action.payload
            );
            state.totalAmount = state.cartItems.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0
            );
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
        },
        setCart: (state, action) => {
            state.cartItems = action.payload;
            state.totalAmount = state.cartItems.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0
            );
        },
    },
});

export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    setCart,
} = cartSlice.actions;
export default cartSlice.reducer;
