import React from 'react';
import { Button, TextField, Link, Box, Container, Typography, Avatar, CssBaseline, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { styled } from '@mui/system';
import styles from './Login.module.css';

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

export default function Login() {
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="off"
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <StyledButton type="submit" fullWidth variant="contained" color="primary">
                            Log In
                        </StyledButton>
                        <Typography component="p" variant="body2">
                            Don't have an account?&nbsp;
                            <Link href="#" variant="body2">
                                {"Sign Up"}
                            </Link>
                        </Typography>
                    </form>
                </StyledBox>
            </Container>
        </div>
    );
}