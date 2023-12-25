import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';

import TimeIcon from '@mui/icons-material/AccessTimeOutlined';
import FeeIcon from '@mui/icons-material/AttachMoneyOutlined';

import { createContext, useContext } from 'react';
import { Divider } from '@mui/material';

import './DoctorCard.css';
const userContext=createContext();

function DoctorCard({user})
{
    const goToUserPage = () => {
        //Navigate to user page
        alert("Navigate to user page");
    }

    return(
        <Card
        variant="outlined"
        onClick={goToUserPage}
        sx={{
            width: '40%',
            background: '#F4F9FB', // Set your desired background color
            borderRadius: '10px',
            margin: '5px',
            padding: '2%',
            '&:hover': {
                cursor:'pointer',
                background: '#F4F8FB', // Set your desired background color
                boxShadow: '10px 0px 10px 0px rgba(0, 0, 0, 0.10)',
            },
          }}
        >
            <div className='user-card-img'>
            <Avatar style={{ margin:'1%',marginLeft:'5%',marginRight:'5%', height: '75px', width: '75px', float: 'left' }}>
                {user.profilePicture? user.profilePicture: "H"}</Avatar>
                <div className="docDetailTop" style={{}}>
                <div className="docName"><p>Dr. {user.user.name}</p></div>
                <div className="docSpeciality"><p>{user.details.specialization}</p></div>
                </div>
            </div>
            <div className='user-card-details'>
            <div>
                <p style={{fontSize:'medium'}}>Under 20 Min</p>
                <p style={{fontSize:'smaller'}}>Wait Time</p>
            </div>
            <Divider orientation='vertical' flexItem/>
            <div>
                <p style={{fontSize:'medium'}}>{user.details.experience}</p>
                <p style={{fontSize:'smaller'}}>Experience</p>
            </div>
            <Divider orientation='vertical' flexItem/>
            <div>
                <p style={{fontSize:'medium'}}>95%</p>
                <p style={{fontSize:'small'}}>Satisfied Patients</p>
            </div>
            </div>
            <div className='location-fee'>
            <div className='location'>
                <p style={{fontSize:'medium' , margin: '2px' }}>{user.details.location}</p>
                <p style={{fontSize:'small',color: user.details.availability? "green":"red", margin: '2px'}}>{user.details.availability? "Available": "Unavailable"}</p>
                
            </div>
            <div className='user-card-Office'>
                <p style={{background:'#2854c3', color: '#f9f9f9'}}><FeeIcon sx={{}}/>Fee: {user.details.fee}</p>
            </div>
            </div>
        </Card>
    )
}

export default DoctorCard;