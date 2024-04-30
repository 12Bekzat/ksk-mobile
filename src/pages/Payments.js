import React, { useEffect, useMemo, useState } from 'react';
import useMainService from '../services/MainService';
import { getLocalStorageWithExpiry } from '../services/getLocalStorageWithExpiry';
import { Link, useNavigate } from 'react-router-dom';
import PaymentItem from '../components/paymentItem/PaymentItem';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const { getUserInfo, getUserPayments } = useMainService();
    const nav = useNavigate();
    const [show, setShow] = useState(1);
    const [me, setMe] = useState(null);

    useEffect(() => {
        const token = getLocalStorageWithExpiry('token');
        if (!token) nav('/login');

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
            <div className="title">Ваши счета</div>
            <div className="payment" id="payments">
                {ratesElement}
            </div>
            {payments.length > 0 ? <Link to={"/pay"} className="link">Оплатить</Link> :
                <div className='text'>Пока нет счетов</div>}
        </div>
    );
};

export default Payments;