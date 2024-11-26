
import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../utils/constants";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/orders`,
                method: "POST",
                body: {...data}
            })
        }),
        
        getMyOrders: builder.query({
            query: () => `${BASE_URL}/api/orders/myorders`,
            providesTags: ['Order'],
            keepUnusedDataFor:5,
            transformResponse: res=>res.data
        }),
        
        getMyOrder: builder.query({
            query: (id) => `${BASE_URL}/api/orders/myorders/${id}`,
            providesTags: ['Order'],
            keepUnusedDataFor:5,
            transformResponse: res=>res.data
        }),
        
        payOrder: builder.mutation({
            query: (id) => ({
                url: `${BASE_URL}/api/orders/myorders/${id}/pay`,
                method: "PUT",
            })
        }),

        downloadInvoice: builder.query({
            query: (id) => `${BASE_URL}/api/orders/myorders/${id}/invoice`,
            providesTags: ['Order'],
            keepUnusedDataFor:5,
        }),

    })
});

export const {
    useCreateOrderMutation,
    useGetMyOrdersQuery,
    useGetMyOrderQuery,
    usePayOrderMutation,
    useLazyDownloadInvoiceQuery,

} = orderApiSlice;
