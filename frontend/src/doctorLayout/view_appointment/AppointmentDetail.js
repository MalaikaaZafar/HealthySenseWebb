
import "@fontsource/roboto";

import UserCard from "../../components/UserCard";
import DetailComponent from "../../components/DetailComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DoctorSidePanel from "../../components/doctorSidePanel";
import AppointmentCard from "../../components/AppointmentCard";
import { Box, Container, Typography } from '@mui/material';
import api from "../../services/api";

function AppointmentDetail() {
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams();

  const getAppointment = async () => {
    try {
      const formattedStr = `/doctor/consultations/${id}`;
      const appoinmentList = await api.get(formattedStr).then((response) => response.data);
      if (appoinmentList.message === "Success") {
        setAppointment(appoinmentList.appt);
        console.log(appoinmentList);
      } else {
        console.log(appoinmentList.message);
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong");
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      await getAppointment();
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: {xs:'column', md:'row'}}}>
      <Box sx={{ flex: 1}}>
        <DoctorSidePanel appt={appointment} />
      </Box>
      <Box sx={{ flex: {xs:1, sm:2, md:3}, display:'flex',flexDirection:'column', mt:2, justifyContent:'center' }}>
        {appointment && (
          <>
            <AppointmentCard appt={appointment} type="patient" />
            <DetailComponent appt={appointment} user="doctor" />
          </>
        )}
      </Box>
    </Box>
  );
}


export default AppointmentDetail;
