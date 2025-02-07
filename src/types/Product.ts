import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    price: number;
    image?: string;
}

interface ProductsState {
    products: Product[];
}

const initialState: ProductsState = {
    products: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
    },
});

export const {addProduct, removeProduct, updateProduct, setProducts} = productsSlice.actions;
export default productsSlice.reducer;
export const selectAllProducts = (state: { products: ProductsState }) => state.products.products;
