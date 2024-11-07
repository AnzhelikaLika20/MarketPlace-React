import ProductCard from '../Card/Card';
import './styles.css';
import {IProductListProps} from "./types.ts";


const ProductList = ({ products, onProductClick }: IProductListProps) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
            ))}
        </div>
    );
};

export default ProductList;