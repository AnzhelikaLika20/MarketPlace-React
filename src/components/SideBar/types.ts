import {Product} from "../../types/Product.ts";

export interface ISidebarProps {
    open: boolean;
    onClose: () => void;
    products: Product[];
    setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
