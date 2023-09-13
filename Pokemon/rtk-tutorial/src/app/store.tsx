// module imports
import { configureStore } from '@reduxjs/toolkit';

// component imports
import { pokemonSlice } from '../services/pokemonSlice';

export const store = configureStore({
    // reducer
    reducer: {
        [pokemonSlice.reducerPath]: pokemonSlice.reducer,
    },

    // Adding the api middleware enables caching, invalidation, polling, and other useful features of rtk-query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonSlice.middleware),
})