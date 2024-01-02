import React from 'react';
import { Button, TextField, Link, Box, Grid, Typography, Avatar, CssBaseline, InputAdornment, IconButton, Hidden } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
    backgroundColor: theme.palette.primary.main,
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
    const [showPassword, setShowPassword] = React.useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

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
                if (res.data.result.type === 'Doctor') {
                    navigate(`/${res.data.result._id}/doctor`, { replace: true });
                } else if (res.data.result.type === 'Patient') {
                    navigate(`/${res.data.result._id}/patient`, { replace: true });
                }
                else if (res.data.result.type === 'Admin') {
                    navigate(`/${res.data.result._id}/admin`, { replace: true });
                }
            })
            .catch(err => {
                console.log(err);
                alert(err.response.data.message);
            })
    }

    return (
        <Box sx={{ width: '100%', height: '100vh' }} bgcolor={'#F1F1F1'}>
            <Grid container>
                <Grid container item xs={12} md={6}
                    sx={{
                        background: 'linear-gradient(to bottom, #0045F3 0%, #454545 126.02%)',
                        height: { xs: '15vh', md: '100vh' }
                    }}
                    justifyContent="center"
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', md: 'column' },
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Hidden mdDown>
                            <img src="./imgs/LOGO.png" alt="Healthy Sense Logo" style={{ width: '300px', height: '300px' }} />
                            <Typography component="h1" variant="h2" color='white'>
                                HealthySense
                            </Typography>
                        </Hidden>
                        <Hidden mdUp>
                            <img src="./imgs/LOGO.png" alt="Healthy Sense Logo" style={{ width: '70px', height: '70px' }} />
                            <Typography component="h1" variant="h5" color='white'>
                                HealthySense
                            </Typography>
                        </Hidden>
                    </Box>
                </Grid>
                <Grid container item xs={12} md={6} justifyContent="center" alignItems="center" p={2} marginTop={{ xs: '30px', md: '0' }}>
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
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleShowPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
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
                </Grid>
            </Grid>
        </Box>
    );
}