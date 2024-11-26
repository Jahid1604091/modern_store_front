
import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../utils/constants";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ search = '', page = 1 }) => `${BASE_URL}/api/products?q=${search}&page=${page}`,
            providesTags: ['Product'],
            keepUnusedDataFor: 5, //data will be cached for 5 seconds after it’s no longer in use.
        }),

        getProduct: builder.query({
            query: (id) => `${BASE_URL}/api/products/${id}`,
            providesTags: ['Product'],
            keepUnusedDataFor: 5, //data will be cached for 5 seconds after it’s no longer in use.
            transformResponse: res => res.data
        }),

        incrementProductView: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/api/products/${id}/view`,
                method: "PUT",

            })
        }),
    })
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useIncrementProductViewMutation,
} = productApiSlice;
