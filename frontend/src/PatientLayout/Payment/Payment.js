import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51ORCE8COwHOebIPaJuo4wEtBzTUJBXnMudevCVpY1l5W7nmq89wvm2FG0CGDBTtZCDztRNCZ0IF7QMyCgcLnGpEz00L1ICDC2t");

const Payment = () => {
    const [clientSecret, setClientSecret] = useState('');

    const apperance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        apperance,
    };

    return (
        <>
            {
                clientSecret &&
                <Elements stripe={stripePromise} options={options} >
                </Elements>

            }
        </>

    );
};

export default Payment;