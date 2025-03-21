import React from 'react';
import ProductCard from '../Card/Card';
import {useNavigate} from 'react-router-dom';
import {ProductListContainer} from './styles';
import {Box, Pagination} from '@mui/material';
import {IProductListProps} from "./types.ts";

const ProductList: React.FC<IProductListProps> = ({products}) => {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 15;
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const displayedProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleProductClick = (id: string) => {
        navigate(`/products/${id}`);
    };

    return (
        <div>
            <ProductListContainer>
                {displayedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => handleProductClick(product.id)}
                    />
                ))}
            </ProductListContainer>
            <Box display="flex" justifyContent="center" mt={2}>
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