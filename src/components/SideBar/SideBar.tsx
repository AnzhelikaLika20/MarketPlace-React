import './styles.css';
import {ISidebarProps} from "./types.ts";


const Sidebar = ({ open }:  ISidebarProps) => {
    return (
        <div className={`sidebar-container ${open ? '' : 'sidebar-closed'}`}>
            <label className="headers-label">Поиск:</label>
            <input className="enter-box" type="text" placeholder="Введите название товара" />

            <label className="filter-label">
                <input type="checkbox" />
                &nbsp; Только товары с ненулевым количеством
            </label>

            <label className="headers-label">Категория:</label>
            <select className="categories-box">
                <option value="">Все категории</option>
                <option value="Электроника">Электроника </option>
                <option value="Одежда">Одежда</option>
                <option value="Продукты">Продукты</option>
            </select>
        </div>
    );
};

export default Sidebar;