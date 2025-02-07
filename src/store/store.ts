import {configureStore} from '@reduxjs/toolkit';
import productsReducer from '../store/modules/products/ProductSlice.ts';
import categoryReducer from '../store/modules/categories/CategorySlice.ts';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoryReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
