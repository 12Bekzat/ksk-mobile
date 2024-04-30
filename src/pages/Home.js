import React, { useEffect, useMemo, useState } from 'react';
import useMainService from '../services/MainService';
import { getLocalStorageWithExpiry } from '../services/getLocalStorageWithExpiry';
import { Link, useNavigate } from 'react-router-dom';
import PaymentItem from '../components/paymentItem/PaymentItem';

const Home = () => {
    const [username, setUsername] = useState('');
    const [payments, setPayments] = useState([]);
    const { getUserInfo, getUserPayments, getNews } = useMainService();
    const nav = useNavigate();
    const [news, setNews] = useState([]);
    const [show, setShow] = useState(1);
    const [me, setMe] = useState(null);

    useEffect(() => {
        const token = getLocalStorageWithExpiry('token');
        if (!token) nav('/login');

        getNews()
            .then(data => setNews(data))
            .catch(e => console.log(e));

        getUserInfo()
            .then(data => {
                setMe(data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (me)
            getUserPayments(me.id)
                .then(data => {
                    setPayments(data);
                })
                .catch(err => console.log(err));
    }, [me]);

    const newsElement = useMemo(() => (
        news.map((item, index) => (
            (show * 2) > index ? <div key={item.id} className="news__item">
                <div className="news__item">
                    <div className="news__author">{item.date}</div>
                    <div className="news__title">{item.title}</div>
                    <div className="news__text">{item.text}</div>
                </div>
            </div> : null
        ))
    ), [news, show]);

    const ratesElement = useMemo(() => (
        payments.map(payment => (
            <div className='payment__row' key={payment.id}>
                <div className="payment__head">Payment</div>
                {payment.counters.map(item => (
                    <PaymentItem key={item.id} id={item.rate} meter={item.meterReadings} status={payment.status} />
                ))}
            </div>
        ))
    ), [payments]);


    return (
        <div className="main">
            <div className="title">Новостная лента</div>
            <div className="news" id="news">
                {newsElement}
            </div>
            {(show * 2) >= news.length ? null : <div className="link" id="more-news"
                onClick={() => {
                    setShow(show => show + 1)
                }}>Еще</div>}

            <div className="title" style={{ marginTop: '40px' }}>Скоро оплата</div>
            <div className="payment" id="payments">
                {ratesElement}
            </div>
            {payments.length > 0 ? <Link to={"/payments"} className="link">Все</Link> : 
                <div className='text'>Пока нет счетов</div>}
        </div>
    );
};

export default Home;