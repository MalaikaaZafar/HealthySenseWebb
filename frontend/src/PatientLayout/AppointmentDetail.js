import PatientIcon from '@mui/icons-material/PeopleAltOutlined';
import ExperienceIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import StarIcon from '@mui/icons-material/StarBorderOutlined';
import Button from '@mui/material/Button';
import "@fontsource/roboto";

import Avatar from '@mui/material/Avatar';

import UserCard from '../Components/UserCard';
import './AppointmentDetail.css';
import DetailComponent from './DetailComponent';

function AppointmentDetail() {
  return (
    <div className="appointmentDetailsScreen">
      <div className="ScreenBody">
       <div className="half">
        <UserCard type='doctor' width='100%'/>
        <DetailComponent timing={'10:30 am - 11:30 am'} problem={'I am also dying'} fee={'1000 Rs.'} feeStatus={'Paid'}/>
        </div>

      <div className="half">
       <div className="infoCard">
         <div className="information">
        <PatientIcon fontSize='large' ></PatientIcon>
          <p><p style={{color: "#f9f9f9", margin: "0px", fontWeight:"bold"}}>90+</p>Patients</p>
         </div>
         <div className="information">
        <ExperienceIcon fontSize='large' ></ExperienceIcon>
         <p><p style={{color: "#f9f9f9", margin: "0px", fontWeight:"bold"}}>90+</p>Patients</p>
         </div>
         <div className="information">
            <StarIcon fontSize='large' ></StarIcon>
         <p><p style={{color: "#f9f9f9", margin: "0px", fontWeight:"bold"}}>90+</p>Patients</p>
         </div>
        </div>
        <div className='appointmentBtns'>
            <Button variant="contained" color="primary" style={{background: '#2854c3', marginBottom:'10px', width: '50%', textTransform: 'none'}}>Reschedule Appointment</Button>
            <Button variant="contained" color="primary" style={{background: '#2854c3', width: '50%', textTransform: 'none'}}>Cancel Appointment</Button>
        </div>
          </div>
        </div>
      </div>
  );
}

export default AppointmentDetail;
