import React, { useState } from 'react';
import ProductList from './components/ProductList/ProductList';
import Sidebar from './components/SideBar/SideBar';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Modal from './components/Modal/Modal';
import { Product } from './types/Product';
import './styles/global.css';
import {products} from "./data/products.ts";


const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const openProductModal = (product: Product) => setSelectedProduct(product);
    const closeProductModal = () => setSelectedProduct(null);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar open={sidebarOpen} />
            <div style={{ flex: 1 }}>
                <NavigationBar toggleSidebar={toggleSidebar} />
                <div style={{ padding: '1rem' }}>
                    <ProductList products={products} onProductClick={openProductModal} />
                </div>
            </div>
            {selectedProduct && <Modal product={selectedProduct}

                                       onClose={closeProductModal} />}
        </div>
    );
};

export default App;