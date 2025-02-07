import React, {useState} from 'react';
import ProductCard from '../Card/Card';
import {IProductListProps} from './types';
import {useSelector} from 'react-redux';
import {selectAllProducts} from '../../types/Product';
import {ProductListContainer} from './styles';
import {Box, Pagination} from '@mui/material';

const ProductList: React.FC<IProductListProps> = ({onProductClick}) => {
    const products = useSelector(selectAllProducts);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;

    const pageCount = Math.ceil(products.length / itemsPerPage);

    const displayedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <ProductListContainer>
                {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)}/>
                ))}
            </ProductListContainer>
            <Box display="flex" justifyContent="center" mt={7}>
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </div>
    );
};

export default ProductList;