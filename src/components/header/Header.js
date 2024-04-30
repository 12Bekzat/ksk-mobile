import React from 'react';
import { Link } from 'react-router-dom';
import { LogoLightImg } from '../../images/system';
import '../../scss/style.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="header__row">
                <div className="header__img">
                    <img src={LogoLightImg} alt="" />
                </div>
            </div>
        </header>
    );
};

export default Header;