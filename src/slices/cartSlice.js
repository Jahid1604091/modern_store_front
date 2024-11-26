import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], taxPrice: 0, shippingPrice: 0, itemsPrice: 0, totalPrice: 0, shippingAddress: {}, paymentMethod: 'stripe' };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(c => c._id === item._id);

      if (existingItem) {
        state.cartItems = state.cartItems.map(c =>
          c._id === existingItem._id ? { ...c, qty: item.qty } : c
        );
      } else {
        state.cartItems.push(item);
      }

      // Calculate prices
      calculatePrices(state);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(c => c._id !== itemId);

      // Recalculate prices
      calculatePrices(state);
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(c => c._id === itemId);

      if (existingItem) {
        existingItem.qty += 1; // Increment quantity
      }

      // Recalculate prices
      calculatePrices(state);
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find(c => c._id === itemId);

      if (existingItem && existingItem.qty > 1) {
        existingItem.qty -= 1; // Decrement quantity
      }

      // Recalculate prices
      calculatePrices(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.totalPrice = 0;

      // Clear cart from local storage
      localStorage.removeItem('cart');
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  }
});

// Helper function to calculate prices
const calculatePrices = (state) => {
  state.itemsPrice = state.cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0);
  state.totalPrice = Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice);

  // Save updated cart to local storage
  localStorage.setItem('cart', JSON.stringify(state));
};

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart, saveShippingAddress, savePaymentMethod } = cartSlice.actions;
export default cartSlice.reducer;
