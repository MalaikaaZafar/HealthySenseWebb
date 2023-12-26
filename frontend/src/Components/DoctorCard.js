import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import FeeIcon from '@mui/icons-material/AttachMoneyOutlined';
import { Button, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';

import './DoctorCard.css';
import { add } from 'date-fns';
import useUserStore from '../stores/userStore';

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
    const goToUserPage = () => {
        //Navigate to user page
        alert("Navigate to user page");
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

            <div className='user-card-img'>
                <Avatar style={{ margin: '1%', marginLeft: '5%', marginRight: '5%', height: '75px', width: '75px', float: 'left' }}>
                    {user.profilePicture ? user.profilePicture : "H"}</Avatar>
                <div className="docDetailTop" style={{}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="docName">Dr. {user.user.name}</div>
                        <IconButton
                            onClick={toggleFavourite}
                            disabled={!actionCompleted}
                            sx={{ p: 0, color: '#2854C3' }}>
                            {favourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </div>
                    <div className="docSpeciality">{user.specialization}</div>
                    <div className="docAddress">{user.location}</div>
                </div>
            </div>
            <div className='user-card-details'>
                <div style={{ display: 'block', alignItems: 'center', textAlign: 'center' }}>
                    <p style={{ display: 'block', fontSize: 'medium', textAlign: 'center' }}>{user.experience}</p>
                    <p style={{ display: 'block', fontSize: 'small', textAlign: 'center' }}>Years of Experience</p>
                </div>
                <Divider orientation='vertical' flexItem />
                <div>
                    <p style={{ display: 'block', fontSize: 'medium', textAlign: 'center' }}>4 out of 5</p>
                    <p style={{ display: 'block', fontSize: 'small', textAlign: 'center' }}>Rating</p>
                </div>
            </div>
            <div className='location-fee'>
                <div className='location'>
                    <p style={{ display: 'flex', alignItems: 'center' }}>
                        <span><FeeIcon sx={{}} /></span>
                        <span>{user.fee} Rs</span></p>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                {buttons &&
                    <>
                        <Button variant="outlined" sx={{ flexGrow: 1, marginRight: '10px', padding: '6px 0', borderColor: 'black', color: 'black', textTransform: 'none' }}>
                            View Profile
                        </Button>
                        <Button variant="contained" sx={{ flexGrow: 1, marginLeft: '10px', padding: '6px 0', backgroundColor: '#2854C3', color: 'white', textTransform: 'none' }}>
                            Book Appointment
                        </Button>
                    </>
                }
            </div>
        </Card >
    )
}

export default DoctorCard;