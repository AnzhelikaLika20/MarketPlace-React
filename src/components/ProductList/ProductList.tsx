import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import ProductCard from '../Card/Card';
import {ProductListContainer} from './styles';
import {Product} from "../../types/Product.ts";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

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
                        key={product._id}
                        product={product}
                        onClick={() => handleProductClick(product._id)}
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
