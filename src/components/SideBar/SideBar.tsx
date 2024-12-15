import React, { useState } from 'react';
import {
    Drawer,
    TextField,
    Checkbox,
    Autocomplete,
    IconButton,
    InputAdornment
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { ISidebarProps } from './types.ts';
import {
    CustomFormControlLabel,
    SidebarContainer,
    SearchContainer,
    SearchButton,
    HeadersLabel,
} from './styles.ts';

const DrawerSidebar: React.FC<ISidebarProps> = ({ open, onClose, products, setFilteredProducts }) => {
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    const categories = ['Category A', 'Category B', 'Category C'];

    const handleFilterApply = () => {
        const searchRegex = new RegExp(searchText, 'i');
        const filteredProducts = products.filter((product) => {
            const matchesSearch =
                searchText === '' ||
                searchRegex.test(product.name) ||
                searchRegex.test(product.description);
            const matchesCategory = !categories.includes(category) || product.category === category;
            const matchesStock = !inStockOnly || product.quantity > 0;
            return matchesSearch && matchesCategory && matchesStock;
        });

        setFilteredProducts(filteredProducts);
        onClose();
    };

    const clearSearch = () => setSearchText('');

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <SidebarContainer>
                <HeadersLabel>Фильтры</HeadersLabel>
                <SearchContainer>
                    <TextField
                        label="Поиск товаров..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="clear search"
                                        onClick={clearSearch}
                                        edge="end"
                                        disabled={!searchText}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </SearchContainer>
                <Autocomplete
                    options={categories}
                    getOptionLabel={(option) => option}
                    value={category}
                    onChange={(_, newValue) => setCategory(newValue || '')}
                    renderInput={(params) => <TextField {...params} label="Категория" />}
                    fullWidth
                />
                <CustomFormControlLabel
                    control={
                        <Checkbox
                            checked={inStockOnly}
                            onChange={(e) => setInStockOnly(e.target.checked)}
                        />
                    }
                    label="Только в наличии"
                />
                <SearchButton onClick={handleFilterApply} color="primary">
                    Поиск
                </SearchButton>
            </SidebarContainer>
        </Drawer>
    );
};

export default DrawerSidebar;
