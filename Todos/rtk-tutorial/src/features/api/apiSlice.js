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
            // providesTags: ['Todos'],
        }),

        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo,
            }),
            // invalidatesTags: ['Todos'],

            // Pessimistic Update - manually update cache data after getting response from the server
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    // getting response from the server
                    const { data: createdTodo } = await queryFulfilled;

                    // manually update cache data
                    dispatch(
                        apiSlice.util.updateQueryData('getTodos', undefined, (draft) => {
                            draft?.unshift(createdTodo)
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        updateTodo: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/todos/${id}`,
                method: 'PATCH',
                body: rest,
            }),
            // invalidatesTags: ['Todos'],

            // Pessimistic Update - manually update cache data after getting response from the server
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    // getting response from the server
                    const { data: updatedTodo } = await queryFulfilled;

                    // manually update cache data
                    dispatch(
                        apiSlice.util.updateQueryData('getTodos', undefined, (draft) => {
                            // update
                            return draft?.map((todo) => {
                                if(todo.id === args.id){
                                    return updatedTodo
                                }
                                return todo
                            })
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
            }),
            // invalidatesTags: (result, error, arg) => [{ type: 'Todos', id: arg }],

            // Optimistic Update - manually update cache data first, then send it to the server
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                // manually update cache data
                dispatch(
                    apiSlice.util.updateQueryData('getTodos', undefined, (draft) => {
                        // delete
                        return draft?.filter((todo) => todo.id !== args)
                    })
                )

                // send it to the server
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                }
            }
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