import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Product, removeProduct, selectProductById, updateProduct} from '../../types/Product';
import EditProductModal from '../EditProductModal/EditProductModal';
import {Box, Button, Paper, Typography} from '@mui/material';

const ProductDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate(); // Используем useNavigate для навигации
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const dispatch = useDispatch();
    const product = useSelector(selectProductById(id!));

    const handleEditClick = () => setEditModalOpen(true);
    const handleEditClose = () => setEditModalOpen(false);

    const handleSave = (updatedProduct: Product) => {
        dispatch(updateProduct(updatedProduct));
        setEditModalOpen(false);
    };

    const handleDelete = () => {
        if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            dispatch(removeProduct(id!));
            navigate('/'); // Используем navigate для перенаправления
        }
    };

    if (!product) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography variant="h5" color="error">
                    Product not found
                </Typography>
            </Box>
        );
    }

    return (
        <Paper elevation={3} sx={{maxWidth: 800, margin: '20px auto', padding: 3}}>
            <Box mb={2}>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="body1"><strong>Category:</strong> {product.category}</Typography>
                <Typography variant="body1"><strong>Description:</strong> {product.description}</Typography>
                <Typography variant="body1"><strong>Quantity:</strong> {product.quantity}</Typography>
                <Typography variant="body1"><strong>Price:</strong> ${product.price.toFixed(2)}</Typography>
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
                onSave={handleSave}
            />
        </Paper>
    );
};

export default ProductDetails;