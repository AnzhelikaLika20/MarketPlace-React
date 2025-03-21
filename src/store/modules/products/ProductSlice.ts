import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../../../types/Product.ts";

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
        deleteProduct: (state, action: PayloadAction<string>) => {
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

export const {addProduct, deleteProduct, updateProduct, setProducts} = productsSlice.actions;
export default productsSlice.reducer;
export const selectAllProducts = (state: { products: ProductsState }) => state.products.products;
export const selectProductById = (id: string | undefined) =>
    createSelector(
        [selectAllProducts],
        (products) => products.find(product => product.id === id)
    );