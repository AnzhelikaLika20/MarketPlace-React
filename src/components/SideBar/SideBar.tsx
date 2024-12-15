import React, { useState, useMemo } from 'react';
import { Autocomplete, Checkbox, Drawer, IconButton, InputAdornment, TextField } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { ISidebarProps } from './types.ts';
import { CustomFormControlLabel, HeadersLabel, SearchButton, SearchContainer, SidebarContainer } from './styles.ts';

const DrawerSidebar: React.FC<ISidebarProps> = ({ open, onClose, products, setFilteredProducts }) => {
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    const categories = useMemo(() => {
        const uniqueCategories = new Set(products.map(product => product.category));
        return Array.from(uniqueCategories);
    }, [products]);

    const handleFilterApply = () => {
        const searchRegex = new RegExp(searchText, 'i');
        const filteredProducts = products.filter((product) => {
            const matchesSearch =
                searchText === '' ||
                searchRegex.test(product.name) ||
                searchRegex.test(product.description);
            const matchesCategory = category === '' || product.category === category;
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
                    label="Только в наличии"/>
                <SearchButton onClick={handleFilterApply} color="primary">
                    Поиск
                </SearchButton>
            </SidebarContainer>
        </Drawer>
    );
};

export default DrawerSidebar;
