import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";
import authSliceReducer from "./slices/authSlice";
import companyReducer from "./slices/companySlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
        company: companyReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiSlice.middleware]),
    devTools: true,
});