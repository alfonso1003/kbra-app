import { configureStore } from "@reduxjs/toolkit";
import addressesReducer from '../features/addresses/addressesSlice';

export const store = configureStore({
    reducer: {
        addresses: addressesReducer,
    }
})