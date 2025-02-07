import React, {useState} from 'react';
import ProductCard from '../Card/Card';
import {Pagination} from '@mui/material';
import {IProductListProps} from './types.ts';
import {PaginationContainer, ProductListContainer} from './styles.ts';
import {useSelector} from "react-redux";
import {selectAllProducts} from '../../types/Product.ts';

const ProductList: React.FC<IProductListProps> = ({onProductClick}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const products = useSelector(selectAllProducts);

    const itemsPerPage = 16;
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <ProductListContainer>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)}/>
                ))}
            </ProductListContainer>
            <PaginationContainer>
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="secondary"
                />
            </PaginationContainer>
        </div>
    );
};

export default ProductList;