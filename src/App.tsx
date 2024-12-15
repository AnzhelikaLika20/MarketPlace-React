import React, { useState } from 'react';
import ProductList from './components/ProductList/ProductList';
import Sidebar from './components/SideBar/SideBar';
import NavigationBar from './components/NavigationBar/NavigationBar';
import './styles/global.css';
import { products } from "./data/products.ts";

const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar open={sidebarOpen} />
            <div style={{ flex: 1 }}>
                <NavigationBar toggleSidebar={toggleSidebar} />
                <div style={{ padding: '1rem' }}>
                    <ProductList products={products} onProductClick={() => {}} />
                </div>
            </div>
        </div>
    );
};

export default App;