import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../utils/constants";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProducts: builder.query({
            queryFn: async ({ search = '', page = 1, sort = '', max_price = 1000000, categories = '' } = {}, { getState }, _extra, baseQuery) => {
                const company_id = getState().company.data?.id ?? '';
                return baseQuery(
                    `${BASE_URL}/api/products?q=${encodeURIComponent(search)}&page=${page}&sort=${sort}&max_price=${max_price}&categories=${encodeURIComponent(categories)}&company_id=${company_id}`
                );
            },
            providesTags: ['Product'],
            keepUnusedDataFor: 5,
        }),

        getProduct: builder.query({
            query: (id) => `${BASE_URL}/api/products/${id}`,
            providesTags: ['Product'],
            keepUnusedDataFor: 5,
            transformResponse: res => res.data,
        }),

        incrementProductView: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/api/products/${id}/view`,
                method: 'PUT',
            }),
        }),

        getCategories: builder.query({
            queryFn: async (_arg, { getState }, _extra, baseQuery) => {
                const company_id = getState().company.data?.id ?? '';
                return baseQuery(`${BASE_URL}/api/categories?company_id=${company_id}`);
            },
            providesTags: ['Category'],
            keepUnusedDataFor: 5,
        }),

        addReview: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/products/${data.id}/review`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),

    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useIncrementProductViewMutation,
    useGetCategoriesQuery,
    useAddReviewMutation,
} = productApiSlice;
