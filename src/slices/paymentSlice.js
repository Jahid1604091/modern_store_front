
import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../utils/constants";

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/payments/manual`,
                method: "POST",
                body: { ...data },

            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Order", id: arg.order_id },
                { type: "Payment", id: arg.order_id },

            ]

        }),

    })
});

export const {
    useCreatePaymentMutation,
} = paymentApiSlice;
