
import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../utils/constants";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/users/register`,
                method: "POST",
                body: { ...data, company_id: process.env.REACT_APP_COMPANY_ID }
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

        // SaaS company (tenant) registration
        registerCompany: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/auth/register`,
                method: "POST",
                body: data
            })
        }),

        // Get all subscription plans (public)
        getPlans: builder.query({
            query: () => `${BASE_URL}/api/auth/plans`,
            keepUnusedDataFor: 300,
        }),

        // Forgot password
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/api/auth/forgot-password`,
                method: "POST",
                body: data
            })
        }),

        // Reset password
        resetPassword: builder.mutation({
            query: ({ token, password }) => ({
                url: `${BASE_URL}/api/auth/reset-password/${token}`,
                method: "PUT",
                body: { password }
            })
        }),
    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetProfileQuery,
    useRegisterCompanyMutation,
    useGetPlansQuery,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = userApiSlice;
