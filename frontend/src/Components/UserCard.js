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
            style={{
              width: "45%",
              background: "#F4F9FB",
              borderRadius: "10px",
              margin: "10px",
            }}>
            <div className='user-card-img'>
            <Avatar style={{ margin:'1%',marginLeft:'5%',marginRight:'5%', height: '75px', width: '75px', float: 'left' }}>H</Avatar>
                <userContext.Provider value={user}>
                {user.type==='doctor' ? <DoctorDetails/> : <PatientDetails/>}
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
            var birthDate = new Date(user.dob);
            return today.getFullYear() - birthDate.getFullYear();;
        }
        return (
            <div className="patientDetails" style={{margin:'3%'}}>
            <div className="docName"><p>Name: {user.name}</p></div>
            <div className="docSpeciality"><p>Age: {calcAge()}</p></div>
            <div className="docExperience"><p>Phone: {user.phoneNumber}</p></div>
          </div>
        )
    }

function DoctorDetails()
    {
        return (
            <div className="patientDetails" style={{margin:'3%'}}>
            <div className="docName"><p>Dr. Amna Irum</p></div>
            <div className="docSpeciality"><p>Nephrologist</p></div>
            <div className="docExperience"><p>5+ Years of Experience</p></div>
          </div>
        )
    }

export default UserCard;