import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';

const AddProductModal: React.FC<{ open: boolean; handleClose: () => void; }> = ({open, handleClose}) => {

    const [productData, setProductData] = useState({
        name: '',
        category: '',
        description: '',
        quantity: '',
        price: '',
        unit: '',
    });

    const [errors, setErrors] = useState({
        name: false,
        category: false,
        description: false,
        quantity: false,
        price: false,
        unit: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });

        if (e.target.value.trim() !== '') {
            setErrors({
                ...errors,
                [e.target.name]: false,
            });
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: !productData.name.trim(),
            category: !productData.category.trim(),
            description: !productData.description.trim(),
            quantity: !productData.quantity.trim(),
            price: !productData.price.trim(),
            unit: !productData.unit.trim(),
        };
        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:5000/api/products', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        ...productData,
                        quantity: parseInt(productData.quantity, 10),
                        price: parseFloat(productData.price),
                    }),
                });
                console.log(response);

                if (!response.ok) {
                    console.log("keke error")
                    console.log(response);
                    throw new Error('Failed to add product');
                }
            } catch (error) {
                console.error('Error adding product:', error);
            }
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Добавить новый товар</DialogTitle>
            <DialogContent>
                <TextField
                    label="Название"
                    name="name"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    error={errors.name}
                    helperText={errors.name && "Название обязательно"}
                />
                <TextField
                    label="Категория"
                    name="category"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    error={errors.category}
                    helperText={errors.category && "Категория обязательна"}
                />
                <TextField
                    label="Описание"
                    name="description"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    error={errors.description}
                    helperText={errors.description && "Описание обязательно"}
                />
                <TextField
                    label="Количество"
                    name="quantity"
                    type="number"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    error={errors.quantity}
                    helperText={errors.quantity && "Количество обязательно"}
                />
                <TextField
                    label="Единица измерения"
                    name="unit"
                    type="number"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    error={errors.unit}
                    helperText={errors.unit && "Цена обязательна"}
                />
                <TextField
                    label="Цена"
                    name="price"
                    type="number"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    error={errors.price}
                    helperText={errors.price && "Цена обязательна"}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Отмена</Button>
                <Button onClick={handleSubmit} color="secondary">Сохранить</Button>
            </DialogActions>x
        </Dialog>
    );
};

export default AddProductModal;