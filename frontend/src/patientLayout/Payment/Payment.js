import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import LoadingAnimation from '../../components/Loader/LoadingAnimation';
import GetClientSecret from '../../services/patient/payment/getClientSecret';
import { Alert, Avatar, Snackbar, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container } from '@mui/system';
import './Payment.css';

const stripePromise = loadStripe("pk_test_51ORCE8COwHOebIPaJuo4wEtBzTUJBXnMudevCVpY1l5W7nmq89wvm2FG0CGDBTtZCDztRNCZ0IF7QMyCgcLnGpEz00L1ICDC2t");

const Payment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [clientSecret, setClientSecret] = useState(null);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("success");

    const apperance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        apperance,
    };

    const fetchSecret = async () => {
        const data = await GetClientSecret(id);
        if (data) {
            console.log(data);
            if (data.Data.Status == true) {
                setMessage("Payment Already Done.");
                setVariant("info");
                setOpen(true);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
                setIsLoading(true);
            }
            else {
                setClientSecret(data.clientSecret);
                setData(data.Data);
                setIsLoading(false);
            }
        }
        else {
            setOpen(true);
            setMessage("Something went wrong");
            setVariant("error");
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    }

    useEffect(() => {
        fetchSecret();
    }, []);


    return (
        <>
            <LoadingAnimation isVisible={isLoading} />
            {
                !isLoading && clientSecret &&
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'inherit' }}>
                    <Container
                        maxWidth='md'
                        sx={{
                            marginTop: '4rem',
                            borderRadius: '10px',
                            padding: '30px',
                            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                            marginBottom: '4rem',
                            backgroundColor: 'white',
                            py: 4,
                        }}
                    >
                        <Typography variant='h4' sx={{ fontWeight: 'bold', textAlign: 'center' }}>Payment</Typography>
                        <Container maxWidth='md' 
                            className="element"
                        sx={{
                            marginTop: '30px',
                            borderRadius: '10px',
                            padding: '20px',
                            border: '1px solid #e0e0e0',
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Avatar alt={data.Name} src={data.Profile} sx={{ width: '120px', height: '120px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginLeft: '30px', gap: '10px' }}>
                                    <Typography variant='h4' sx={{ fontWeight: 'bold', fontSize: '30px' }}>Dr. {data.Name}</Typography>
                                    <Typography variant='p' sx={{ color: 'GrayText' }}>{data.Specialization}</Typography>
                                    <Typography variant='p' sx={{ color: 'GrayText' }}>{data.Location}</Typography>
                                </div>
                            </div>
                        </Container>
                        <Container maxWidth='md' sx={{
                            marginTop: '30px',
                            borderRadius: '10px',
                            padding: '10px',
                            border: '1px solid #e0e0e0',
                        }}
                        className="element"
                        >
                            <Container maxWidth='md' sx={{ marginTop: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <Typography variant='h6' sx={{ color: 'GrayText' }}>Appointment Details</Typography>
                                    <Typography variant='h6' sx={{ color: 'GrayText' }}>{data.Date.slice(0, 10) + " | " + data.Time}</Typography>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <Typography variant='h6' sx={{ color: 'GrayText' }}>Fee</Typography>
                                    <Typography variant='h6' sx={{ color: 'GrayText' }}>{data.Fee}</Typography>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <Typography variant='h6' sx={{ color: 'GrayText' }}>Type</Typography>
                                    <Typography variant='h6' sx={{ color: 'GrayText' }}>{data.Type}</Typography>
                                </div>
                            </Container>
                        </Container>
                        <Elements stripe={stripePromise} options={options} >
                            <PaymentForm id={data.PaymentId} />
                        </Elements>
                    </Container>
                </Box>

            }
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={6000}
            >
                <Alert severity={variant} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </>

    );
};

export default Payment;