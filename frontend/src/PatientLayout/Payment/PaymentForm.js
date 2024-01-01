import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Alert, Button, Container, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SavePayment from "../../services/patient/payment/savePayment";


const PaymentForm = ({ id }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState("success");

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
            redirect: 'if_required'
        });
        if (error) {
            setMessage("Payment Failed.");
            setOpen(true);
            setVariant("error");
        }
        else if (paymentIntent && paymentIntent.status === "succeeded") {
            if(await SavePayment(id)){
                setMessage("Payment Successful.");
                setOpen(true);
                setVariant("success");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
            else{
                setMessage("Payment Failed.");
                setOpen(true);
                setVariant("error");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        }
        else {
            setMessage("Payment Failed.");
            setVariant("error");
        }
    }

    useEffect(() => {
        if (!stripe) {
            return;
        }
    }, [stripe]);

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <Container
                sx={{
                    marginTop: '5rem',
                    borderRadius: '1rem',
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    padding: '2rem',
                    backgroundColor:'white',
                }}
            >
                <PaymentElement id="card-element" options={{ layout: 'tabs' }} />
            </Container>
            <Container
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: '1rem',
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                        marginTop: '2rem',
                    }}
                >
                    Confirm Payement
                </Button>
            </Container>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={variant} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

        </form>
    );
}

export default PaymentForm;