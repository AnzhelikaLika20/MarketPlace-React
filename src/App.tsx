import React, {useState} from 'react';
import ProductList from './components/ProductList/ProductList';
import Sidebar from './components/SideBar/SideBar';
import NavigationBar from './components/NavigationBar/NavigationBar';
import {products} from "./data/products.ts";

const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products);

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
                    <ProductList products={filteredProducts} onProductClick={() => {
                    }}/>
                </div>
            </div>
        </div>
    );
};


export default App;