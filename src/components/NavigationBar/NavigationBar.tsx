import './styles.css';
import {INavigationBarProps} from "./types.ts";


const NavigationBar = ({ toggleSidebar }: INavigationBarProps) => {
    return (
        <nav className="nav">
            <div className="nav-item" onClick={toggleSidebar}>☰</div>
            <div>
                <span className="nav-item">Товары</span>
                <span className="nav-item">Склады</span>
                <span className="nav-item">О системе</span>
                <span className="nav-item">Личная страница пользователя</span>
            </div>
        </nav>
    );
};

export default NavigationBar;