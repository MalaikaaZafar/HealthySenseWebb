import React from 'react';
import { Button, TextField, Link, Box, Container, Typography, Avatar, CssBaseline, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { styled } from '@mui/system';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(3),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
}));

export default function Login() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        }

        api.post('/login', data)
            .then(res => {
                console.log(res);
                document.cookie = `token=${res.data.token}`;
                navigate('/', { replace: true });
            })
            .catch(err => {
                console.log(err);
                alert(err.response.data.message);
            })
    }

    return (
        <div className={styles.Screen}>
            <div className={styles.Background}>
                <img src="./imgs/LOGO.png" alt="Healthy Sense Logo" />
                <Typography component="h1" variant="h2" color='white'>
                    HealthySense
                </Typography>
            </div>
            <Container component="main" className={styles.Container}>
                <CssBaseline />
                <StyledBox>
                    <StyledAvatar>
                        <LockOutlinedIcon />
                    </StyledAvatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <form noValidate autoComplete="off">
                        <StyledTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <StyledTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <StyledButton type="submit" fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                            Log In
                        </StyledButton>
                        <Typography component="p" variant="body2">
                            Don't have an account?&nbsp;
                            <Link href="" variant="body2" onClick={() => navigate('/signup', { replace: true })} underline='none'>
                                {"Sign Up"}
                            </Link>
                        </Typography>
                    </form>
                </StyledBox>
            </Container>
        </div>
    );
}