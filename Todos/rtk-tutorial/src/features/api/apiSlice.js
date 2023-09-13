// module imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    // reducer
    reducerPath: 'api',

    // base url
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),

    // tag - to refetch updated cached data
    tagTypes: ['Todos'],

    // endpoints
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['Todos'],
        }),

        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo,
            }),
            invalidatesTags: ['Todos'],
        }),

        updateTodo: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/todos/${id}`,
                method: 'PATCH',
                body: rest,
            }),
            invalidatesTags: ['Todos'],
        }),

        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos'],
        }),
    })
})

// export hooks
export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = apiSlice;