import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../utils/constants";

export const bannerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBanners: builder.query({
            queryFn: async (_arg, { getState }, _extra, baseQuery) => {
                const company_id = getState().company.data?.id ?? '';
                return baseQuery(`${BASE_URL}/api/banners?company_id=${company_id}`);
            },
            providesTags: ['Banner'],
            keepUnusedDataFor: 30,
        }),
    }),
});

export const { useGetBannersQuery } = bannerApiSlice;
