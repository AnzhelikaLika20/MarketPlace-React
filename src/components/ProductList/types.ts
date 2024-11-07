import {Product} from "../../types/Product.ts";

export interface IProductListProps {
    products: Product[];
    onProductClick: (product: Product) => void;
}