import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import axios from 'axios';
import LoadingAnimation from '../../components/loader/LoadingAnimation';

const stripePromise = loadStripe("pk_test_51ORCE8COwHOebIPaJuo4wEtBzTUJBXnMudevCVpY1l5W7nmq89wvm2FG0CGDBTtZCDztRNCZ0IF7QMyCgcLnGpEz00L1ICDC2t");

const Payment = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [clientSecret, setClientSecret] = useState(null);

    const apperance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        apperance,
    };
    const id="658c14c5d25bdcb960447ae9";

    const GetClientSecret = async () => {
        try{
            const response = await axios.get(`http://localhost:5000/payment/create-payment-intent/${id}`);
            const data = response.data;
            setClientSecret(data.clientSecret);
            console.log(data);
            setIsLoading(false);
        }
        catch(err){
            console.log(err);
        }
    }


    useEffect(() => {
        GetClientSecret();
    }, []);
        

    return (
        <>
            <LoadingAnimation isLoading={isLoading} />
            {
                clientSecret &&
                <Elements stripe={stripePromise} options={options} >
                    <PaymentForm id={id} />
                </Elements>
                
            }
        </>

    );
};

export default Payment;