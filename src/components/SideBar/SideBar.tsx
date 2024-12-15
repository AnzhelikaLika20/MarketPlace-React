import React, { useState } from 'react';
import { Drawer, Button, TextField, Checkbox, FormControlLabel, Autocomplete } from '@mui/material';
import {ISidebarProps } from './types.ts';

const DrawerSidebar: React.FC<ISidebarProps> = ({ open, onClose, products, setFilteredProducts }) => {
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    // Предопределенные категории
    const categories = ['Все', 'Category A', 'Category B', 'Category C'];

    const handleFilterApply = () => {
        const searchRegex = new RegExp(searchText, 'i');

        const filteredProducts = products.filter((product) => {
            const matchesSearch = searchText === '' || searchRegex.test(product.name) || searchRegex.test(product.description);
            console.log(category);
            const matchesCategory = !categories.includes(category)  || category === 'Все' || product.category === category;
            const matchesStock = !inStockOnly || product.quantity > 0;

            return matchesSearch && matchesCategory && matchesStock;
        });

        setFilteredProducts(filteredProducts);
        onClose(); // Закрывает боковую панель
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <div style={{ width: 250, padding: 16 }}>
                <h2>Фильтры</h2>
                <div>
                    <TextField
                        label="Поиск продуктов..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        fullWidth
                    />
                    <Button onClick={handleFilterApply} variant="contained" color="primary" fullWidth>
                        Поиск
                    </Button>
                </div>
                <div style={{ marginTop: 20 }}>
                    <Autocomplete
                        options={categories}
                        getOptionLabel={(option) => option}
                        value={category}
                        onChange={(_, newValue) => setCategory(newValue || '')}
                        renderInput={(params) => <TextField {...params} label="Категория" />}
                        fullWidth
                    />
                </div>
                <div style={{ marginTop: 20 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={inStockOnly}
                                onChange={(e) => setInStockOnly(e.target.checked)}
                            />
                        }
                        label="Только в наличии"
                    />
                </div>
            </div>
        </Drawer>
    );
};

export default DrawerSidebar;
