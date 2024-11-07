import {Product} from "../../types/Product.ts";

export interface IProductCardProps {
    product: Product;
    onClick: () => void;
}