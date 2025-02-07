import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectProductById} from '../../types/Product';

const ProductDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const product = useSelector(selectProductById(id));

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
        </div>
    );
};

export default ProductDetails;