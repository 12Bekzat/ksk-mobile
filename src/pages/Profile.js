import React, { useContext, useEffect, useMemo, useState } from 'react';
import useMainService from '../services/MainService';
import { AuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [myInfo, setMyInfo] = useState({ fullname: '', username: '', id: -1 });
    const [previewImg, setPreviewImg] = useState(null);
    const { getUserInfo, setLogo, getLogo } = useMainService();
    const { role, setAuth, setRole } = useContext(AuthContext);

    useEffect(() => {
        getUserInfo()
            .then(data => {
                setMyInfo({ fullname: data.fullName, username: data.username, id: data.id })
                if (data.avatarId !== -1) {
                    getLogo(data.avatarId)
                        .then(buffer => {
                            const base64Image = btoa(
                                new Uint8Array(buffer).reduce(
                                    (data, byte) => data + String.fromCharCode(byte),
                                    ''
                                )
                            );
                            setPreviewImg(`data:image/jpeg;base64,${base64Image}`);
                        })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleFileChange = (event) => {
        const fileData = event.target.files[0];
        const formData = new FormData();
        formData.append('file', fileData);

        setLogo(formData)
            .then(data => {
                setPreviewImg(URL.createObjectURL(fileData));
            })
            .catch(err => {
                console.log(err);
            });
    };

    const avatar = useMemo(() => {
        return previewImg ? <img src={previewImg} /> : <i className="fa-solid fa-user profile__img-icon"></i>
    }, [previewImg]);

    return (
        <div className='main__row' style={{ 'alignItems': 'center' }}>
            <div className="profile">
                <div className={"profile__img" + (previewImg ? ' img' : '')}>
                    {avatar}
                    <div className="profile__file">
                        <input autoComplete='off' id='avatar' accept="image/*" type="file" onChange={handleFileChange} />
                        <label htmlFor="avatar">
                            <i className="fas fa-camera"></i>
                        </label>
                    </div>
                </div>
                <div className="profile__content">
                    <div className="profile__title">
                        {myInfo.fullname}
                        <Link to={"/user/edit/" + myInfo.id + "?me=true"} className="profile__edit">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                    </div>
                    <div className="profile__username">
                        {myInfo.username}
                    </div>
                    <div className="profile__button"
                        onClick={() => {
                            localStorage.removeItem('token');
                            setRole([]);
                            setAuth(false);
                        }}>
                        Выйти c аккаунта
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;