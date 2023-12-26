import PatientIcon from '@mui/icons-material/PeopleAltOutlined';
import ExperienceIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import StarIcon from '@mui/icons-material/StarBorderOutlined';
import Button from '@mui/material/Button';
import "@fontsource/roboto";

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './AppointmentDetail.css';
import DetailComponent from './DetailComponent';
import AppointmentCard from '../../components/AppointmentCard';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';

export const AppointmentDetail = () => {
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams();

  const Navigate = useNavigate();

  const fetchAppointment = async () => {
    try{
      const formattedStr = `http://localhost:3000/patient/consultations/${id}`;
      const appoinmentList = await axios.get(formattedStr).then((response) => response.data);
      setAppointment(appoinmentList);
      console.log(appointment);
    }
    catch(err)
    {
      alert(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchAppointment();
    };
    fetchData();
  }, []);

  const reschedAppt = () => {
    Navigate(`/patient/appointments/reschedule/${id}`);
  }

  const cancelAppt = () => {
    Navigate(`/patient/appointments/cancel/${id}`);
  }
  return (
    <div className="appointmentDetailsScreen">
        <div className="appointmentDetailsScreenBody">
          <div className="left">
          {appointment && <AppointmentCard type="doctor" appt={appointment}/>}
          {appointment && <DetailComponent appt={appointment}/>}
          </div>
          <div className="right">
            <div className='docInfo'>
              <div className='docInfo1'>
                <PersonOutlineOutlined sx={styles.icon}/>
                <p><b>90</b></p><p>Patients</p>
              </div>
              <div className='docInfo1'>
                <ExperienceIcon sx={styles.icon}/>
                <p><b>{appointment?.doctorId.experience} Years</b></p><p> Experience</p>
              </div>
              <div className='docInfo1'>
                <StarIcon sx={styles.icon}/>
                <p><b>4.5</b></p><p>Rating</p>
              </div>
            </div>
            <div className='apptButtons'>
              <Button onClick={reschedAppt} variant="contained" className='apptButton' sx={styles.button}>
                Reschedule Appointment</Button>
              <Button onClick={cancelAppt} variant="contained" className='apptButton' sx={styles.button}>
                Cancel Appointment</Button>
            </div>
          </div>
        </div>
    </div>
  );
}


const styles = {
button: {
  color: 'white',
  backgroundColor: '#2854C3',
  '&:hover': {
    backgroundColor: '#2854C3',
    boxShadow: '10px 0px 10px 0px rgba(0, 0, 0, 0.10)',
    cursor:'pointer',
  },
  borderRadius: '10px',
  padding: '10px 20px',
  width: '70%',
  margin:'5px',
  fontSize: 'smaller',
  textTransform: 'none',
},
icon:{
  fontSize: '30px',
  margin: '5%',
  verticalAlign: 'middle',
}
}

