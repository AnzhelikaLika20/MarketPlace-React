import React, {useEffect, useState} from 'react';
import ProductList from './components/ProductList/ProductList';
import Sidebar from './components/SideBar/SideBar';
import NavigationBar from './components/NavigationBar/NavigationBar';
import {products} from "./data/products.ts";
import {addProduct} from "./types/Product.ts";
import {useDispatch} from "react-redux";
import AddProductModal from "./components/AddProductModal/AddProductModal.tsx";

const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateModalClose = () => {
        setIsCreateModalOpen(false);
    };


    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const dispatch = useDispatch();
    useEffect(() => {

        products.forEach(product => {
            dispatch(addProduct(product));
        });

    }, [dispatch]);

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
                    <button onClick={handleModalOpen} style={{marginBottom: '1rem'}}>
                        Добавить товар
                    </button>
                    <ProductList products={filteredProducts} onProductClick={() => {
                    }}/>
                </div>
            </div>
            <AddProductModal open={isCreateModalOpen} handleClose={handleCreateModalClose}/>
        </div>
    );
};


export default App;