import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { Button, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import './DoctorCard.css';
import useUserStore from '../stores/userStore';
import { Box } from '@mui/system';
import addFavorite from '../services/addFavorite';
import removeFavorite from '../services/removeFavorite';
import { useNavigate } from 'react-router-dom';

function DoctorCard({ user, buttons, onFavChanged }) {
    const [favourite, setFavourite] = React.useState(false);
    const { user: loggedUser, updateUser } = useUserStore();
    const [actionCompleted, setActionCompleted] = React.useState(true);
    const [clinicFee, setClinicFee] = React.useState(0);
    const [onlineFee, setOnlineFee] = React.useState(0);

    useEffect(() => {
        user.session.map((session) => {
            if (session.type == 'Clinic') {
                setClinicFee(session.fee);
            }
            else {
                setOnlineFee(session.fee);
            }
        })
    }, [user]);
    const goToUserPage = () => {
        //Navigate to user page
        alert("Navigate to user page");
    }
    const Navigate=useNavigate();   
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
                opacity: user.user.isBanned ? 0.5 : 1,
            }}
        >

            <Box className='user-card-img'>
                <Avatar style={{ margin: '1%', marginLeft: '5%', marginRight: '5%', height: '75px', width: '75px', float: 'left' }}>
                    {user.profilePicture ? user.profilePicture : "H"}
                </Avatar>
                <div className="docDetailTop">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="docName">Dr. {user.user.name}</div>
                        {buttons && <IconButton
                            onClick={toggleFavourite}
                            disabled={!actionCompleted}
                            sx={{ p: 0, color: '#2854C3', marginLeft: 'auto', float: 'right' }}>
                            {favourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        }
                    </div>
                    <div className="docSpeciality">{user.specialization}</div>
                    <div className="docAddress">{user.location}</div>
                </div>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0, width: `100%` }}>
                <div style={{ width: '50%' }}>
                    <p style={{ display: 'flex', fontSize: 'medium', textAlign: 'center', justifyContent: 'center', margin: '0px ' }}>{user.experience}</p>
                    <p style={{ display: 'block', fontSize: 'small', textAlign: 'center', justifyContent: 'center', margin: '0px' }}>Years of Experience</p>
                </div>
                <Divider orientation='vertical' flexItem sx={{ marginTop: 1, height: 60 }} />
                <div style={{ width: '50%' }}>
                    <p style={{ display: 'block', fontSize: 'medium', textAlign: 'center', margin: '0px' }}>4 out of 5</p>
                    <p style={{ display: 'block', fontSize: 'small', textAlign: 'center', margin: '0px' }}>Rating</p>
                </div>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', backgroundColor: 'aliceblue', borderColor: '#ededed', borderWidth: 1, borderRadius: 3, borderStyle: 'solid' }}>
                <p style={{ display: 'flex', alignItems: 'center', width: '50%', justifyContent: 'center' }}>
                    <span><VideoCameraFrontIcon style={{ color: '#2854c3', marginRight: 5 }} /></span>
                    <span>Online:{onlineFee} Rs</span>
                </p>
                <Divider orientation='vertical' flexItem sx={{ margin: '0 10px' }} />
                <p style={{ display: 'flex', alignItems: 'center', width: '50%', justifyContent: 'center' }}>
                    <span><NoteAltIcon style={{ color: '#2854c3', marginRight: 5 }} /></span>
                    <span>Clinic:{clinicFee} Rs</span>
                </p>
            </Box>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                {buttons &&
                    <>
                        <Button 
                        onClick={goToUserPage}
                        variant="outlined" sx={{ flexGrow: 1, marginRight: '10px', padding: '6px 0', borderColor: 'black', color: 'black', textTransform: 'none', width: '50%' }}>
                            View Profile
                        </Button>
                        <Button 
                        onClick={bookAppt}
                        variant="contained" sx={{ flexGrow: 1, marginLeft: '10px', padding: '6px 0', backgroundColor: '#2854C3', color: 'white', textTransform: 'none', width: '50%' }}>
                            Book Appointment
                        </Button>
                    </>
                }
            </div>
        </Card >
    )
}

export default DoctorCard;
