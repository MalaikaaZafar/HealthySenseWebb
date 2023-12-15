import Button from '@mui/material/Button';
import "@fontsource/roboto";
import Avatar from '@mui/material/Avatar';
import './AppointmentDetail.css';

import UserCard from '../Components/UserCard';
import DetailComponent from './DetailComponent';

function AppointmentDetail() {
  return (
    <div className="appointmentDetailsScreen">
      <div className="ScreenBody">
       <div className="half">
        <UserCard type='patient' width='100%'/>
        <DetailComponent timing={'10:30 am - 11:30 am'} problem={'I am dying'} fee={'1000 Rs.'} feeStatus={'Paid'} />
        <div className='appointmentBtns'>
            <Button variant="contained"  style={{background: '#2854c3', margin:'10px', width: '50%', textTransform: 'none', borderRadius: '10px'}}>Reschedule Appointment</Button>
            <Button variant="contained"  style={{background: '#2854c3', width: '50%', textTransform: 'none', borderRadius: '10px'}}>Cancel Appointment</Button>
        </div>
        </div>
        </div>
      </div>
  );
}

export default AppointmentDetail;
