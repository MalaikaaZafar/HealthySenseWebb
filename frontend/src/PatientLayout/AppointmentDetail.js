import PatientIcon from '@mui/icons-material/PeopleAltOutlined';
import ExperienceIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import StarIcon from '@mui/icons-material/StarBorderOutlined';
import Button from '@mui/material/Button';
import "@fontsource/roboto";

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './AppointmentDetail.css';
import DetailComponent from './DetailComponent';
import AppointmentCard from '../components/AppointmentCard';

export const AppointmentDetail = () => {
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams();

  const fetchAppointment = async () => {
    try{
      const formattedStr = `http://localhost:3000/patient/consultations/${id}`;
      const appoinmentList = await axios.get(formattedStr).then((response) => response.data);
      setAppointment(appoinmentList);
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


  return (
    <div className="appointmentDetailsScreen">
        <div className="appointmentDetailsScreenBody">
          <div className="left">
          {appointment && <AppointmentCard appt={appointment}/>}
          {appointment && <DetailComponent appt={appointment}/>}
          </div>
          <div className="right">
            <div className='docInfo'>
              <div className='docInfo1'>
                
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
