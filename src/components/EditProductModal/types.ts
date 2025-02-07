import {Product} from "../../types/Product.ts";

export interface EditProductModalProps {
    open: boolean;
    product: Product;
    handleClose: () => void;
    onSave: (updatedProduct: Product) => void; // Указываем, что updatedProduct имеет тип Product
}
