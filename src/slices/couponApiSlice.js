import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../utils/constants";

export const couponApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFeaturedCoupon: builder.query({
            queryFn: async (_arg, { getState }, _extra, baseQuery) => {
                const company_id = getState().company.data?.id ?? '';
                if (!company_id) return { data: { success: true, data: null } };
                return baseQuery(`${BASE_URL}/api/coupons/featured?company_id=${company_id}`);
            },
            providesTags: ['Coupon'],
            keepUnusedDataFor: 60,
        }),

        validateCoupon: builder.mutation({
            queryFn: async ({ code, subtotal }, { getState }, _extra, baseQuery) => {
                const company_id = getState().company.data?.id ?? '';
                return baseQuery({
                    url: `${BASE_URL}/api/coupons/validate`,
                    method: 'POST',
                    body: { code, company_id, subtotal },
                });
            },
        }),
    }),
});

export const { useGetFeaturedCouponQuery, useValidateCouponMutation } = couponApiSlice;
