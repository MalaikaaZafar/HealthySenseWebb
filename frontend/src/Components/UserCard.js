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
            
                <userContext.Provider value={user}>
                <PatientDetails/>
                </userContext.Provider>
        </Card>
    )
}

function PatientDetails()
    {
        const user=useContext(userContext);
        function calcAge()
        {
            var today = new Date();
            var birthDate = new Date(user.patientId.user.dob);
            return today.getFullYear() - birthDate.getFullYear();;
        }
        return (
            <Box className='user-card-img'>
            <Avatar style={{ margin:'1%',marginLeft:'5%',marginRight:'5%', height: '75px', width: '75px', float: 'left' }}>
                {user?.patientId.user.profilePicture? user.patientId.user.profilePicture: "H"}</Avatar>
            <Box className="patientDetails" style={{margin:'3%'}}>
            <Box className="docName"><p>Name: {user.patientId.user.name}</p></Box>
            <Box className="docSpeciality"><p>Age: {calcAge()}</p></Box>
            <Box className="docExperience"><p>Phone: {user.patientId.user.phoneNumber}</p></Box>
          </Box>
          </Box>
        )
    }

function DoctorDetails()
    {
        const user=useContext(userContext);
        return (
            <Box className='user-card-img'>
            <Avatar style={{ margin:'1%',marginLeft:'5%',marginRight:'5%', height: '75px', width: '75px', float: 'left' }}>
                {user?.doctorId.user.profilePicture? user.doctorId.user.profilePicture: "H"}</Avatar>
            <Box className="patientDetails" style={{margin:'3%'}}>
            <Box className="docDetailLeft">
                <Box className="docName"><p>Dr. {user.doctorId.user.name}</p></Box>
                <Box className="docSpeciality"><p>{user.doctorId.specialization}</p></Box>
                <Box className="docExperience"><p>{user.doctorId.experience} Years of Experience</p></Box>
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
          </Box>
        )
    }

export default UserCard;