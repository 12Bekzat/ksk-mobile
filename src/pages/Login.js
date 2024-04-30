import React, { useState } from 'react';
import useMainService from '../services/MainService';
import { useNavigate } from 'react-router-dom';
import '../scss/style.scss';
import { setLocalStorageWithExpiry } from '../services/setLocalStorageWithExpiry';
import { DateTime } from 'luxon';
import ReactInputMask from 'react-input-mask';


const Login = () => {

    const [username, setUsername] = useState('');
    const [isNumber, setNumber] = useState(false);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [hide, setHide] = useState(true);
    const { auth } = useMainService();
    const navigate = useNavigate();

    const authorize = () => {
        auth(!isNumber ? username : phone, password)
            .then(data => {
                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 6);
                setLocalStorageWithExpiry('token', data.token, expiryDate.toISOString());

                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="main">
            <div className="title">Авторизоватся</div>
            <div className="form">
                <div className="form__input">
                    {!isNumber ? <div className="form__input">
                        <input autoComplete='off'
                            className={username !== '' ? 'focus' : ''}
                            type="text"
                            id='username'
                            value={username}
                            onChange={e => setUsername(e.target.value)} />
                        <label htmlFor="username">
                            Имя пользователя
                        </label>
                        <div
                            className={"form__icon"}
                            onClick={() => { setNumber(true) }}>
                            <i className="fa-solid fa-font"></i>
                        </div>
                    </div> : null}
                    {isNumber ? <div className="form__input">
                        <ReactInputMask
                            mask={"+7(999)999-99-99"}
                            autoComplete='off'
                            className={phone !== '' ? 'focus' : ''}
                            type="text"
                            id='phone'
                            value={phone}
                            onChange={e => setPhone(e.target.value)} />
                        <label htmlFor="phone">
                            Номер телефона
                        </label>
                        <div
                            className={"form__icon"}
                            onClick={() => { setNumber(false) }}>
                            <i className="fa-solid fa-phone"></i>
                        </div>
                    </div> : null}
                </div>
                <div className="form__input">
                    <input type={hide ? "password" : "text"} className={password != '' ? 'focus' : ''} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="password">
                        Пароль
                    </label>
                    <div
                        className={"form__icon" + (hide ? '' : ' view')}
                        onClick={() => { setHide(hide => !hide) }}>
                        <i className="fa-regular fa-eye login__icon-view"></i>
                        <i className="fa-regular fa-eye-slash login__icon-hidden"></i>
                    </div>
                </div>
                <div className="form__button" id="signin"
                    onClick={() => {
                        console.log('request send');
                        authorize();
                    }}>Войти</div>
            </div>
        </div>
    );
};

export default Login;