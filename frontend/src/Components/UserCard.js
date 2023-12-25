import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
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
            margin: '10px',
            '&:hover': {
                cursor:'pointer',
                background: '#F4F8FB', // Set your desired background color
                boxShadow: '10px 0px 10px 0px rgba(0, 0, 0, 0.10)',
            },
          }}
        >
            <div className='user-card-img'>
            <Avatar style={{ margin:'1%',marginLeft:'5%',marginRight:'5%', height: '75px', width: '75px', float: 'left' }}>
                {user?.user?.profilePicture? user.profilePicture: "H"}</Avatar>
                <userContext.Provider value={user}>
                {user?.user?.type==='Doctor' ? <DoctorDetails/> : <PatientDetails/>}
                </userContext.Provider>
            </div>
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
            <div className="patientDetails" style={{margin:'3%'}}>
            <div className="docName"><p>Name: {user.user.name}</p></div>
            <div className="docSpeciality"><p>Age: {calcAge()}</p></div>
            <div className="docExperience"><p>Phone: {user.user.phoneNumber}</p></div>
          </div>
        )
    }

function DoctorDetails()
    {
        const user=useContext(userContext);
        return (
            <div className="patientDetails" style={{margin:'3%'}}>
            <div className="docDetailLeft">
                <div className="docName"><p>Dr. {user.user.name}</p></div>
                <div className="docSpeciality"><p>{user.details.specialization}</p></div>
                <div className="docExperience"><p>5+ Years of Experience</p></div>
            </div>
            <div className="docDetailRight">
                {user.details.availability ? 
                <Button 
                    variant="contained" 
                    style={{backgroundColor:'', color:'white', margin:'5%'}}>
                    Available</Button> : 
                <Button 
                variant="contained" 
                style={{backgroundColor:'#F94144', color:'white', margin:'5%'}}>
                    Not Available</Button>}
            </div>
          </div>
        )
    }

export default UserCard;