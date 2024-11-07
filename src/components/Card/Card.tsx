import {IProductCardProps} from "./types.ts";
import './styles.css';

const ProductCard = ({ product, onClick }: IProductCardProps) => {
    return (
        <div className="product-card" onClick={onClick}>
            <h3 className="product-title">{product.name}</h3>
            <p className="product-description">{product.description || 'Описание отсутствует'}</p>
            <p>Категория: {product.category}</p>
            <p>Количество: {product.quantity}</p>
            <p>Единица: {product.unit}</p>
            {product.image ? (
                <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
            ) : (
                <p/>
            )}
        </div>
    );
};

export default ProductCard;