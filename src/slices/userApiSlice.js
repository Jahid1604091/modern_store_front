
import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../utils/constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/users/register`,
                method: "POST",
                body: data
            })
        }),

        login: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/users/login`,
                method: "POST",
                body: data
            })
        }),

        getProfile: builder.query({
            query: () => `${BASE_URL}/api/users/profile`,
            providesTags: ['User'],
            keepUnusedDataFor:5, 
            transformResponse: res=>res.data
        }),
        
    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetProfileQuery,
} = userApiSlice;
