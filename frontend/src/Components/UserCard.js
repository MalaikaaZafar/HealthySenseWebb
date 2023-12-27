import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createContext, useContext } from 'react';
const userContext=createContext();

function UserCard({user})
{
    return(
        <Card
        variant="outlined"
        sx={{
            width: '100%',
            background: '#F4F9FB', // Set your desired background color
            borderRadius: '10px',
            '&:hover': {
                cursor:'pointer',
                background: '#F4F8FB', // Set your desired background color
                boxShadow: '10px 0px 10px 0px rgba(0, 0, 0, 0.10)',
            },
          }}
        >
            <Box className='user-card-img'>
            <Avatar style={{ margin:'1%',marginLeft:'5%',marginRight:'5%', height: '75px', width: '75px', float: 'left' }}>
                {user?.user.profilePicture? user.profilePicture: "H"}</Avatar>
                <userContext.Provider value={user}>
                <PatientDetails/>
                </userContext.Provider>
            </Box>
        </Card>
    )
}

function PatientDetails()
    {
        const user=useContext(userContext);
        function calcAge()
        {
            var today = new Date();
            var birthDate = new Date(user.user.dob);
            return today.getFullYear() - birthDate.getFullYear();;
        }
        return (
            <Box className="patientDetails" style={{margin:'3%'}}>
            <Box className="docName"><p>Name: {user.user.name}</p></Box>
            <Box className="docSpeciality"><p>Age: {calcAge()}</p></Box>
            <Box className="docExperience"><p>Phone: {user.user.phoneNumber}</p></Box>
          </Box>
        )
    }

function DoctorDetails()
    {
        const user=useContext(userContext);
        return (
            <Box className="patientDetails" style={{margin:'3%'}}>
            <Box className="docDetailLeft">
                <Box className="docName"><p>Dr. {user.user.name}</p></Box>
                <Box className="docSpeciality"><p>{user.specialization}</p></Box>
                <Box className="docExperience"><p>{user.experience} Years of Experience</p></Box>
            </Box>
            <Box className="docDetailRight">
                {user.availability ? 
                <Button 
                    variant="contained" 
                    style={{backgroundColor:'', color:'white', margin:'5%'}}>
                    Available</Button> : 
                <Button 
                variant="contained" 
                style={{backgroundColor:'#F94144', color:'white', margin:'5%'}}>
                    Not Available</Button>}
            </Box>
          </Box>
        )
    }

export default UserCard;