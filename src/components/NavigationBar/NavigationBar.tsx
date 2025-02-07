import React from 'react';
import {INavigationBarProps} from "./types.ts";
import {Nav, NavItem} from './styles.ts';
import {useNavigate} from 'react-router-dom';

const NavigationBar: React.FC<INavigationBarProps> = ({toggleSidebar}) => {
    const navigate = useNavigate();

    const handleCategoriesClick = () => {
        navigate(`/categories`);
    };

    const handleGoodsClick = () => {
        navigate(`/`);
    };

    return (
        <Nav>
            <NavItem onClick={toggleSidebar}>☰</NavItem>
            <div>
                <NavItem onClick={handleGoodsClick}>Товары</NavItem>
                <NavItem>Склады</NavItem>
                <NavItem onClick={handleCategoriesClick}>Категории</NavItem>
                <NavItem>О системе</NavItem>
                <NavItem>Личная страница пользователя</NavItem>
            </div>
        </Nav>
    );
};

export default NavigationBar;