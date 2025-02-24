import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Button, Paper, Typography} from '@mui/material';
import EditProductModal from '../EditProductModal/EditProductModal';
import {Product} from '../../types/Product';

const ProductDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleEditClick = () => setEditModalOpen(true);
    const handleEditClose = () => setEditModalOpen(false);

    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete product');
                }
                navigate('/');
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    if (isLoading) {
        return <Typography variant="h5" textAlign="center" mt={4}>Загрузка...</Typography>;
    }

    if (!product) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography variant="h5" color="error">
                    Товар не найден
                </Typography>
            </Box>
        );
    }

    return (
        <Paper elevation={3} sx={{maxWidth: 800, margin: '20px auto', padding: 3}}>
            <Box mb={2}>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="body1"><strong>Категория:</strong> {product.category || 'Нет данных'}</Typography>
                <Typography variant="body1"><strong>Количество:</strong> {product.quantity}</Typography>
                <Typography variant="body1"><strong>Цена:</strong> ${product.price.toFixed(2)}</Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={handleEditClick}>
                Редактировать товар
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ml: 2}}>
                Удалить товар
            </Button>
            <EditProductModal
                open={isEditModalOpen}
                product={product}
                handleClose={handleEditClose}
                onSave={(updatedProduct) => setProduct(updatedProduct)}
            />
        </Paper>
    );
};

export default ProductDetails;
