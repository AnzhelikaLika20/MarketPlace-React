import {configureStore} from '@reduxjs/toolkit';
import productsReducer from '../types/Product.ts';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

// Выведем тип хранилища для использования в хуках
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;