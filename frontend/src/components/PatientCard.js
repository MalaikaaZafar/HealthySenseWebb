import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { Divider } from '@mui/material';
import './DoctorCard.css';
import { Box } from '@mui/system';


function PatientCard({ user, buttons }) {
    const [age, setAge] = React.useState(0);

    useEffect(() => {
        const dob = new Date(user.user.dob);
        const today = new Date();
        const agee = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            agee--;
        }
        setAge(agee);
    }, [user]);

    const goToUserPage = () => {
        //Navigate to user page
        alert("Navigate to user page");
    }

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

            <div className='user-card-img'>
                <Avatar style={{ margin: '1%', marginLeft: '5%', marginRight: '5%', height: '75px', width: '75px', float: 'left' }}>
                    {user.profilePicture ? user.profilePicture : "H"}
                </Avatar>
                <div className="docDetailTop">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="docName">{user.user.name}</div>
                    </div>
                    <div className="docSpeciality">{user.user.gender}</div>
                </div>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0, width: `100%` }}>
                <div style={{ width: '50%' }}>
                    <p style={{ display: 'flex', fontSize: 'medium', textAlign: 'center', justifyContent: 'center', margin: '0px ' }}>{age}</p>
                    <p style={{ display: 'block', fontSize: 'small', textAlign: 'center', justifyContent: 'center', margin: '0px' }}>Age</p>
                </div>
                <Divider orientation='vertical' flexItem sx={{ marginTop: 1, height: 60 }} />
                <div style={{ width: '50%' }}>
                    <p style={{ display: 'block', fontSize: 'medium', textAlign: 'center', margin: '0px' }}>{user.bloodGroup}</p>
                    <p style={{ display: 'block', fontSize: 'small', textAlign: 'center', margin: '0px' }}>Blood Group</p>
                </div>
            </Box>
        </Card >
    )
}

export default PatientCard;