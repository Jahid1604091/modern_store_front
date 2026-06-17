import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], taxPrice: 0, shippingPrice: 0, itemsPrice: 0, totalPrice: 0, shippingAddress: {}, paymentMethod: 'bKash', couponCode: null, discountAmount: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        c => c.id === item.id && c.selectedSize === item.selectedSize
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map(c =>
          c === existingItem ? { ...c, qty: item.qty } : c
        );
      } else {
        state.cartItems.push(item);
      }

      // A coupon's discount is computed against the subtotal at apply-time —
      // the cart changed, so it must be re-validated before it can apply again.
      invalidateCoupon(state);
      calculatePrices(state);
    },
    removeFromCart: (state, action) => {
      const { id, selectedSize } = action.payload;
      state.cartItems = state.cartItems.filter(
        c => !(c.id === id && c.selectedSize === selectedSize)
      );

      invalidateCoupon(state);
      calculatePrices(state);
    },
    incrementQuantity: (state, action) => {
      const { id, selectedSize } = action.payload;
      const existingItem = state.cartItems.find(
        c => c.id === id && c.selectedSize === selectedSize
      );

      if (existingItem) {
        existingItem.qty += 1; // Increment quantity
      }

      invalidateCoupon(state);
      calculatePrices(state);
    },
    decrementQuantity: (state, action) => {
      const { id, selectedSize } = action.payload;
      const existingItem = state.cartItems.find(
        c => c.id === id && c.selectedSize === selectedSize
      );

      if (existingItem && existingItem.qty > 1) {
        existingItem.qty -= 1; // Decrement quantity
      }

      invalidateCoupon(state);
      calculatePrices(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.totalPrice = 0;
      state.couponCode = null;
      state.discountAmount = 0;

      // Clear cart from local storage
      localStorage.removeItem('cart');
    },
    applyCoupon: (state, action) => {
      const { code, discountAmount } = action.payload;
      state.couponCode = code;
      state.discountAmount = discountAmount;
      calculatePrices(state);
    },
    removeCoupon: (state) => {
      state.couponCode = null;
      state.discountAmount = 0;
      calculatePrices(state);
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

// Clears a previously-applied coupon — used whenever cart contents change,
// since the discount was computed against a subtotal that's no longer current.
const invalidateCoupon = (state) => {
  if (state.couponCode) {
    state.couponCode = null;
    state.discountAmount = 0;
  }
};

// Helper function to calculate prices
const calculatePrices = (state) => {
  state.itemsPrice = state.cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0);
  state.totalPrice = Math.max(
    Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice) - Number(state.discountAmount || 0),
    0
  );

  // Save updated cart to local storage
  localStorage.setItem('cart', JSON.stringify(state));
};

export const {
  addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart,
  saveShippingAddress, savePaymentMethod, applyCoupon, removeCoupon,
} = cartSlice.actions;
export default cartSlice.reducer;
