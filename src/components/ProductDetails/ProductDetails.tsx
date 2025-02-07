import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Product, selectProductById, updateProduct} from '../../types/Product';
import EditProductModal from "../EditProductModal/EditProductModal.tsx";
import {Box, Button, Paper, Typography} from '@mui/material';

const ProductDetails: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const dispatch = useDispatch();
    const product = useSelector(selectProductById(id!));

    const handleEditClick = () => setEditModalOpen(true);
    const handleEditClose = () => setEditModalOpen(false);

    const handleSave = (updatedProduct: Product) => {
        dispatch(updateProduct(updatedProduct));
        setEditModalOpen(false);
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