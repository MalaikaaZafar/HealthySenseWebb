import Button from '@mui/material/Button';
import "@fontsource/roboto";
import Avatar from '@mui/material/Avatar';
import './AppointmentDetail.css';

import UserCard from '../components/UserCard';
import DetailComponent from './DetailComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function AppointmentDetail() {
  const [appointment, setAppointment]=useState(null)
  const Navigate=useNavigate();
  const {id}=useParams();
 
  const getAppointment=async ()=>
  {
    const formattedStr=`http://localhost:3000/doctor/consultations/${id}`;
    const appoinmentList= await fetch(formattedStr,{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  }).then((response) =>  response.json());
    setAppointment(appoinmentList)
  }


  function rescheduleNav()
  {
    Navigate(`/doctor/appointments/reschedule/${id}`);
  }
 
  function cancelNav()
  {
    Navigate('/doctor/cancelAppointment');
  }
  
  useEffect(() => {
    const fetchData = async () => {
      await getAppointment();
    };
    fetchData();
  }, []);

  
  return (
    <div className="appointmentDetailsScreen">
      <div className="ScreenBodyAD">
       <div className="halfAD">
        {appointment && 
        <>
        <UserCard user={appointment}/>
        <DetailComponent appt={appointment} /> 
        </>
        }
        
        <div className='appointmentBtns'>
            <Button variant="contained" onClick={rescheduleNav}  style={{background: '#2854c3', margin:'10px', width: '50%', textTransform: 'none', borderRadius: '10px'}}>Reschedule Appointment</Button>
            <Button variant="contained" onClick={cancelNav} style={{background: '#2854c3', width: '50%', textTransform: 'none', borderRadius: '10px'}}>Cancel Appointment</Button>
        </div>
        </div>
        </div>
      </div>
  );
}

export default AppointmentDetail;
