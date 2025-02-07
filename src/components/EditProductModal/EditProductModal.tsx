import React, {useEffect, useState} from 'react';
import {Product} from '../../types/Product';
import {EditProductModalProps} from './types';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';

const EditProductModal: React.FC<EditProductModalProps> = ({open, product, handleClose, onSave}) => {
    const [formValues, setFormValues] = useState<Product>(product);

    useEffect(() => {
        setFormValues(product);
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: name === 'price' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formValues);
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
                        value={formValues.name}
                    />
                    <TextField
                        label="Описание"
                        name="description"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formValues.description}
                    />
                    <TextField
                        label="Количество"
                        name="quantity"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formValues.quantity}
                    />
                    <TextField
                        label="Единица измерения"
                        name="unit"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formValues.unit}
                    />
                    <TextField
                        label="Цена"
                        name="price"
                        type="number"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        value={formValues.price}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Отмена
                </Button>
                <Button onClick={handleSubmit} color="primary" type="submit">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProductModal;