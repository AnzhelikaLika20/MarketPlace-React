import {Product} from "../../types/Product.ts";

export interface IModalProps {
    product: Product;
    onClose: () => void;
}