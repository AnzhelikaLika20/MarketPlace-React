import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {Box, Button, Container, ThemeProvider} from '@mui/material';
import ProductList from './components/ProductList/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails.tsx';
import Sidebar from './components/SideBar/SideBar';
import NavigationBar from './components/NavigationBar/NavigationBar';
import AddProductModal from './components/AddProductModal/AddProductModal';
import {products} from "./data/products";
import {addProduct} from "./store/modules/products/ProductSlice.ts";
import CategoryManagement from "./components/CategoryManagement/CategoryManagement.tsx";
import UserProfile from "./components/UserProfile/UserProfile.tsx";
import theme from "./components/ThemeProvider/ThemeProvider.tsx";

const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const location = useLocation();

    const dispatch = useDispatch();
    useEffect(() => {
        products.forEach(product => {
            dispatch(addProduct(product));
        });
    }, [dispatch]);

    const handleModalOpen = () => setIsCreateModalOpen(true);

    const handleCreateModalClose = () => setIsCreateModalOpen(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex'}}>
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    products={products}
                    setFilteredProducts={setFilteredProducts}
                />
                <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <NavigationBar toggleSidebar={toggleSidebar}/>
                    <Container sx={{padding: '3rem', flex: 1}}>
                        {location.pathname === '/' && (
                            <Button variant="contained" color="primary" onClick={handleModalOpen} sx={{mb: 2}}>
                                Добавить товар
                            </Button>
                        )}
                        <Routes>
                            <Route path="/" element={<ProductList products={filteredProducts}/>}/>
                            <Route path="/products/:id" element={<ProductDetails/>}/>
                            <Route path="/categories" element={<CategoryManagement/>}/>
                            <Route path="/user-profile" element={<UserProfile/>}/>
                        </Routes>
                    </Container>
                </Box>
                <AddProductModal open={isCreateModalOpen} handleClose={handleCreateModalClose}/>
            </Box>
        </ThemeProvider>
    );
};

const AppWrapper: React.FC = () => (
    <Router>
        <App/>
    </Router>
);

export default AppWrapper;