// module imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// component imports
import { Contact } from '../models/contact.model';

// Define a service using a base URL and expected endpoints
export const contactsApi = createApi({
    // reducer
    reducerPath: 'contactsApi',

    // base URL
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3006/' }),

    // tagType
    tagTypes: ['Contact'],

    // endpoints
    // query<type, anyParameterTypePassedToUrl>
    endpoints: (builder) => ({
        // providesTags - for Queries
        contacts: builder.query<Contact[], void>({
            query: () => '/contacts',
            // providesTags: ['Contact'],
            providesTags: (result, error, arg) => {
                return result
                    ? [...result.map(({ id }) => ({ type: 'Contact' as const, id })), 'Contact']
                    : ['Contact']
            },
        }),

        getContact: builder.query<Contact, string>({
            query: (id) => `/contacts/${id}`,
            providesTags: ['Contact'],
        }),

        // invalidatesTags - for Mutations
        addContact: builder.mutation<void, Contact>({
            query: (contact) => ({
                url: '/contacts',
                method: 'POST',
                body: contact,
            }),
            invalidatesTags: ['Contact'],
        }),

        updateContact: builder.mutation<void, Contact>({
            query: ({ id, ...rest }) => ({
                url: `/contacts/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Contact'],
        }),

        deleteContact: builder.mutation<void, string>({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            // invalidatesTags: ['Contact'],
            invalidatesTags: (result, error, arg) => [{ type: 'Contact', id: arg }],
        }),
    })
});

// Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
// use + 'endpoint' + Query
// use + 'endpoint' + Mutation
export const {
    useContactsQuery,
    useGetContactQuery,
    useAddContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,
} = contactsApi;