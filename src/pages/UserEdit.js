import React, { useContext, useEffect, useState } from 'react';
import useMainService from '../services/MainService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const UserEdit = () => {
    const [fullName, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirm, setHideConfirm] = useState(true);
    const { getUserInfoById, getUserInfo, setUserData } = useMainService();
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const me = searchParams.get('me');

    useEffect(() => {
        if (me) {

        } else {
            setPassword("password");
            setConfirmPassword("password")
        }

        getUserInfoById(id)
            .then(data => {
                setFullname(data.fullName);
                setUsername(data.username);
                setEmail(data.email ? data.email : '');
            })
            .catch(err => {
                console.log(err);
                console.log("user not found!");
                navigate("/profile");
            })
    }, [])

    function validateEmail(email) {
        return email.includes("@") && email.includes(".");
    }

    const edit = () => {
        const user = {
            fullName: fullName,
            username: username,
            me: me ? true : false,
            email, password, confirmPassword: me ? confirmPassword : password
        }

        console.log(user);

        if (fullName === '' || email === '' || !validateEmail(email) || password !== confirmPassword || password === '') {
            return;
        }


        setUserData(user)
            .then(data => {
                navigate("/profile");
            })
            .catch(err => {
                console.log(err);
            });
    }


    return (
        <div className='form'>
            <div className="form__title">Изменения</div>
            <div className="form__input">
                <input autoComplete='off'
                    className={fullName !== '' ? 'focus' : ''}
                    type="text"
                    id='username'
                    value={fullName}
                    onChange={e => setFullname(e.target.value)} />
                <label htmlFor="username">
                    Имя пользователя
                </label>
            </div>
            <div className="form__input">
                <input autoComplete='off'
                    className={email !== '' ? 'focus' : ''}
                    type="text"
                    id='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <label htmlFor="email">
                    Email
                </label>
            </div>
            {me ? <><div className="form__input">
                <input autoComplete='off'
                    className={'icon' + (password !== '' ? ' focus' : '')}
                    type={hidePassword ? "password" : 'text'}
                    id='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <label htmlFor="password">
                    Пароль
                </label>
                <div
                    className={"form__icon" + (hidePassword ? '' : ' view')}
                    onClick={() => { setHidePassword(hidePassword => !hidePassword) }}>
                    <i className="fa-regular fa-eye form__icon-view"></i>
                    <i className="fa-regular fa-eye-slash form__icon-hidden"></i>
                </div>
            </div>
                <div className="form__input">
                    <input autoComplete='off'
                        className={'icon' + (confirmPassword !== '' ? ' focus' : '')}
                        type={hideConfirm ? "password" : 'text'}
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)} />
                    <label htmlFor="confirmPassword">
                        Подтверждение
                    </label>
                    <div
                        className={"form__icon" + (hideConfirm ? '' : ' view')}
                        onClick={() => { setHideConfirm(hideConfirm => !hideConfirm) }}>
                        <i className="fa-regular fa-eye form__icon-view"></i>
                        <i className="fa-regular fa-eye-slash form__icon-hidden"></i>
                    </div>
                </div></> : null}
            <div className="form__space">
                <div className="form__button" onClick={edit}>Сохранить</div>
                <div className="form__button dec" onClick={() => navigate("/profile")}>Отмена</div>
            </div>
        </div>
    );
};

export default UserEdit;