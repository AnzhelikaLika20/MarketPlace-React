import React, { useState } from 'react';
import ProductCard from '../Card/Card';
import { Pagination } from '@mui/material';
import './styles.css';
import { IProductListProps } from './types.ts';

const ProductList: React.FC<IProductListProps> = ({ products, onProductClick }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const currentProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="product-list">
                {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
                ))}
            </div>
            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="secondary"
                />
            </div>
        </div>
    );
};

export default ProductList;