// module imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    // reducer
    reducerPath: 'api',

    // base url
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3600/'
    }),

    // tags - to refetch updates
    tagTypes: ['Users'],

    // endpoints
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
            providesTags: ['Users'],
        }),

        createUser: builder.mutation({
            query: (name) => ({
                url: '/users',
                method: 'POST',
                body: { name },
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

// export Auto-Generated Hooks
export const {
    useGetUsersQuery,
    useCreateUserMutation,
} = apiSlice;