
import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../utils/constants";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ search = '', page = 1, sort='', max_price=1000000,categories='' }) => `${BASE_URL}/api/products?q=${search}&page=${page}&sort=${sort}&max_price=${max_price}&categories=${categories}`,
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

        getCategories: builder.query({
            query: () => `${BASE_URL}/api/categories`,
            providesTags: ['Category'],
            keepUnusedDataFor: 5,
        }),

        addReview: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/products/${data.id}/review`,
                method: "PATCH",
                body:data
            }),
            invalidatesTags:['Product']
        }),

    })
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useIncrementProductViewMutation,
    useGetCategoriesQuery,
    useAddReviewMutation,
} = productApiSlice;
