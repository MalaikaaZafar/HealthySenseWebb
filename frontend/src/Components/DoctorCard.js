import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import FeeIcon from '@mui/icons-material/AttachMoneyOutlined';
import { Button, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import Box from '@mui/material/Box';

import './DoctorCard.css';
import { add } from 'date-fns';
import useUserStore from '../stores/userStore';
import { useNavigate } from 'react-router-dom';

const removeFavorite = async (doctorId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:3000/favorites/${doctorId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const addFavorite = async (doctorId) => {
    try {
        console.log(doctorId);
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:3000/favorites/${doctorId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}


function DoctorCard({ user, buttons, onFavChanged }) {
    const [favourite, setFavourite] = React.useState(false);
    const { user: loggedUser, updateUser } = useUserStore();
    const [actionCompleted, setActionCompleted] = React.useState(true);
    const Navigate = useNavigate();
    const goToUserPage = () => {
        //Navigate to user page
        alert("Navigate to user page");
    }

    const bookAppt = () => {
        Navigate(`/patient/book-appointment/${user._id}`);
    }

    const toggleFavourite = async (e) => {
        e.stopPropagation();
        setActionCompleted(false);
        setFavourite((prevFavourite) => !prevFavourite);
        if (favourite) {
            const res = await removeFavorite(user.user._id);
            if (!res) {

                setActionCompleted(true);
                alert("Something went wrong");
                setFavourite((prevFavourite) => !prevFavourite);
                return;
            }
        }
        else {
            const res = await addFavorite(user.user._id);
            if (!res) {
                alert("Something went wrong");
                setActionCompleted(true);
                setFavourite((prevFavourite) => !prevFavourite);
                return;
            }
        }
        if (onFavChanged) {
            onFavChanged();
        }
        await updateUser();
        setActionCompleted(true);
    }

    useEffect(() => {
        updateUser();
        if (loggedUser.favoriteDoctors?.includes(user.user._id)) {
            setFavourite(true);
        }
    }, [user]);
    return (
        <Card
            variant="outlined"
            onClick={goToUserPage}
            sx={{
                minWidth: '300px',
                maxWidth: '400px',
                width: '40%',
                background: 'white', // Set your desired background color
                borderRadius: '10px',
                margin: '5px',
                padding: '2%',
                '&:hover': {
                    cursor: 'pointer',
                    background: '#F4F8FB', // Set your desired background color
                    boxShadow: '10px 0px 10px 0px rgba(0, 0, 0, 0.10)',
                },
            }}
        >

            <Box className='user-card-img'>
                <Avatar style={{ margin: '1%', marginLeft: '5%', marginRight: '5%', height: '75px', width: '75px', float: 'left' }}>
                    {user.profilePicture ? user.profilePicture : "H"}</Avatar>
                <Box className="docDetailTop" style={{}}>
                    <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box className="docName">Dr. {user.user.name}</Box>
                        <IconButton
                            onClick={toggleFavourite}
                            disabled={!actionCompleted}
                            sx={{ p: 0, color: '#2854C3' }}>
                            {favourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </Box>
                    <Box className="docSpeciality">{user.specialization}</Box>
                    <Box className="docAddress">{user.location}</Box>
                </Box>
            </Box>
            <Box className='user-card-details'>
                <Box style={{ display: 'block', alignItems: 'center', textAlign: 'center' }}>
                    <p style={{ display: 'block', fontSize: 'medium', textAlign: 'center' }}>{user.experience}</p>
                    <p style={{ display: 'block', fontSize: 'small', textAlign: 'center' }}>Years of Experience</p>
                </Box>
                <Divider orientation='vertical' flexItem />
                <Box>
                    <p style={{ display: 'block', fontSize: 'medium', textAlign: 'center' }}>4 out of 5</p>
                    <p style={{ display: 'block', fontSize: 'small', textAlign: 'center' }}>Rating</p>
                </Box>
            </Box>
            <Box className='location-fee'>
                <Box className='location'>
                    <p style={{ display: 'flex', alignItems: 'center' }}>
                        <span><FeeIcon sx={{}} /></span>
                        <span>{user.fee} Rs</span></p>
                </Box>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                {buttons &&
                    <>
                        <Button 
                        variant="outlined"
                        onClick={goToUserPage}
                        sx={{ flexGrow: 1, marginRight: '10px', padding: '6px 0', borderColor: 'black', color: 'black', textTransform: 'none' }}>
                            View Profile
                        </Button>
                        <Button 
                        variant="contained"
                        onClick={bookAppt}
                        sx={{ flexGrow: 1, marginLeft: '10px', padding: '6px 0', backgroundColor: '#2854C3', color: 'white', textTransform: 'none' }}>
                            Book Appointment
                        </Button>
                    </>
                }
            </Box>
        </Card >
    )
}

export default DoctorCard;