import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Container } from "@mui/material";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { set } from "date-fns";

const PaymentForm = ({ id }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();


    const [succeeded, setSucceeded] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "",
            },
            redirect:'if_required'
        });
        if (error) {
            setMessage(error.message);
        } 
        else if(paymentIntent && paymentIntent.status==="succeeded"){
            setMessage("Payment Successful");
            try{
                const response = await axios.post(`http://localhost:5000/payment/create-payment/${id}`);
                const data = response.data;
                console.log(data);
                navigate('/patient/payment/confirm');
            }
            catch(err){
                console.log(err);
            }
        }
        else {
            setMessage("Payment Failed.");
        }
    }

    useEffect(() => {
        if (!stripe) {
            return;
        }
    }, [stripe]);

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <Container>
                <PaymentElement id="card-element" options={{ layout: 'tabs' }} />
            </Container>
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
            {
                message && <p>{message}</p>
            }
        </form>
    );
}

export default PaymentForm;