import React from 'react';
import {INavigationBarProps} from "./types.ts";
import {Nav, NavItem} from './styles.ts';

const NavigationBar: React.FC<INavigationBarProps> = ({toggleSidebar}) => {
    return (
        <Nav>
            <NavItem onClick={toggleSidebar}>☰</NavItem>
            <div>
                <NavItem>Товары</NavItem>
                <NavItem>Склады</NavItem>
                <NavItem>О системе</NavItem>
                <NavItem>Личная страница пользователя</NavItem>
            </div>
        </Nav>
    );
};

export default NavigationBar;