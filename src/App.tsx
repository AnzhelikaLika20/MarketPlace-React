import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";
import ProductList from './components/ProductList/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails.tsx';
import Sidebar from './components/SideBar/SideBar';
import NavigationBar from './components/NavigationBar/NavigationBar';
import AddProductModal from './components/AddProductModal/AddProductModal';
import {products} from "./data/products";
import {addProduct} from "./types/Product";
import CategoryManagement from "./components/CategoryManagement/CategoryManagement.tsx";

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

    const handleModalOpen = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateModalClose = () => {
        setIsCreateModalOpen(false);
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div style={{display: 'flex'}}>
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                products={products}
                setFilteredProducts={setFilteredProducts}
            />
            <div style={{flex: 1}}>
                <NavigationBar toggleSidebar={toggleSidebar}/>
                <div style={{padding: '1rem'}}>
                    {location.pathname === '/' && (
                        <button onClick={handleModalOpen} style={{marginBottom: '1rem'}}>
                            Добавить товар
                        </button>
                    )}
                    <Routes>
                        <Route path="/" element={<ProductList products={filteredProducts}/>}/>
                        <Route path="/products/:id" element={<ProductDetails/>}/>
                        <Route path="/categories" element={<CategoryManagement/>}/>
                    </Routes>
                </div>
            </div>
            <AddProductModal open={isCreateModalOpen} handleClose={handleCreateModalClose}/>
        </div>
    );
};

const AppWrapper: React.FC = () => (
    <Router>
        <App/>
    </Router>
);

export default AppWrapper;