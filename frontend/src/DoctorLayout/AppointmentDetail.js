import Button from '@mui/material/Button';
import "@fontsource/roboto";
import Avatar from '@mui/material/Avatar';
import './AppointmentDetail.css';

import UserCard from '../Components/UserCard';
import DetailComponent from './DetailComponent';
import { useNavigate } from 'react-router-dom';

function AppointmentDetail() {
  const Navigate=useNavigate();

  function rescheduleNav()
  {
    Navigate('/doctor/rescheduleAppointment');
  }

  function cancelNav()
  {
    Navigate('/doctor/cancelAppointment');
  }
  
  return (
    <div className="appointmentDetailsScreen">
      <div className="ScreenBodyAD">
       <div className="halfAD">
        <UserCard type='patient'/>
        <DetailComponent timing={'10:30 am - 11:30 am'} problem={'I am dying'} fee={'1000 Rs.'} feeStatus={'Paid'} />
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
