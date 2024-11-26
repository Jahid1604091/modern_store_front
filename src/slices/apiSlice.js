import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constants";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const state = getState()
        const { userInfo } = state.auth;
        if (userInfo) {
            headers.set('Authorization', `Bearer ${userInfo.token}`);
        }
        return headers;
    },

});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery,
    tagTypes: ["User", "Product", "Order"],
    endpoints: (builder) => ({}),
});


