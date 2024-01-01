
import "@fontsource/roboto";

import UserCard from "../../components/UserCard";
import DetailComponent from "../../components/DetailComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DoctorSidePanel from "../../components/doctorSidePanel";
import AppointmentCard from "../../components/AppointmentCard";
import { Box, Container, Typography } from '@mui/material';

function AppointmentDetail() {
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams();

  const getAppointment = async () => {
    try {
      const formattedStr = `http://localhost:3000/doctor/consultations/${id}`;
      const appoinmentList = await fetch(formattedStr, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
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
      <Box sx={{ flex: {xs:1, sm:2, md:3}, display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
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
