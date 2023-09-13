// module imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// component imports
import { Pokemon, PokemonList } from '../model/Pokemon';

export const pokemonSlice = createApi({
    // reducer
    reducerPath: 'pokemon',

    // base url
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pokeapi.co/api/v2/'
    }),

    // endpoints
    endpoints: (builder) => ({
        getPokemon: builder.query<PokemonList, void>({
            query: () => '/pokemon',
        }),

        getPokemonByName: builder.query<Pokemon, string>({
            query: (name) => `/pokemon/${name}`,
        }),
    })
})

// export Auto-Generated Hooks
export const {
    useGetPokemonQuery,
    useGetPokemonByNameQuery,
} = pokemonSlice;