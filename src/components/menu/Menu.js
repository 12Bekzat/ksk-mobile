import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../scss/style.scss';
import { AuthContext } from '../../providers/AuthProvider';

const Menu = () => {
    const {isAuth} = useContext(AuthContext);
    
    return (
        <div className="menu">
            <div className="menu__row">
                <NavLink to={"/"} className={({ isActive }) => "menu__item" + (isActive ? " active" : "")}>
                    <div className="menu__icon">
                        <i className="fa-solid fa-house"></i>
                    </div>
                    <div className="menu__text">Главная</div>
                </NavLink>
                <NavLink to={"/payments"} className={({ isActive }) => "menu__item" + (isActive ? " active" : "")}>
                    <div className="menu__icon">
                        <i className="fa-solid fa-bag-shopping"></i>
                    </div>
                    <div className="menu__text">Счета</div>
                </NavLink>
                <NavLink to={"/services"} className={({ isActive }) => "menu__item" + (isActive ? " active" : "")}>
                    <div className="menu__icon">
                        <i className="fa-solid fa-screwdriver-wrench"></i>
                    </div>
                    <div className="menu__text">Услуги</div>
                </NavLink>
                <NavLink to={"/profile"} className={({ isActive }) => "menu__item" + (isActive ? " active" : "")}>
                    <div className="menu__icon">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="menu__text">Профиль</div>
                </NavLink>
            </div>
        </div>
    );
};

export default Menu;