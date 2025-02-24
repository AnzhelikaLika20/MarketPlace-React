import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {EditProductModalProps} from './types';

const EditProductModal: React.FC<EditProductModalProps> = ({open, product, handleClose, onSave}) => {
    const [formValues, setFormValues] = useState(product);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setFormValues(product);
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/api/products/${formValues._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formValues),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const updatedProduct = await response.json();
            onSave(updatedProduct);
            handleClose();
        } catch (err) {
            setError((err as Error).message);
            console.error('Error updating product:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Редактировать товар</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        label="Название"
                        name="name"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formValues.name}
                    />
                    <TextField
                        label="Категория"
                        name="category"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formValues.category}
                    />
                    <TextField
                        label="Описание"
                        name="description"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formValues.description || ''}
                    />
                    <TextField
                        label="Количество"
                        name="quantity"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formValues.quantity || 0}
                    />
                    <TextField
                        label="Единица измерения"
                        name="unit"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formValues.unit || ''}
                    />
                    <TextField
                        label="Цена"
                        name="price"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formValues.price || 0}
                    />
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary" disabled={loading}>
                    Отмена
                </Button>
                <Button onClick={handleSubmit} color="primary" type="submit" disabled={loading}>
                    {loading ? 'Сохранение...' : 'Сохранить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProductModal;
