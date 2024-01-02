import { React, useEffect, useState } from "react";
import NotFoundImg from "./404Illustration.png";

import { Container, Box, Tabs, Tab, Button } from '@mui/material';

import ApptCardForList from "../../components/ApptCardForList";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const fetchAppointments = async () => {
  const appoinmentList = await api.get(`/patient/consultations`)
  .then((response) => response.data);
  return appoinmentList;
};
export const AppointmentList = () => {
  const [value, setValue] = useState("Booked");
  const [appointmentList, setAppointmentList] = useState([]);
  const {patientId} = useParams();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const bookAppt = () =>{
    navigate(`/${patientId}/patient`)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAppointments();
      if (data) {
        setAppointmentList(data);
      }
    };
    fetchData();
  }, []);

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" width="100%">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab value="Booked" label="Scheduled" />
          <Tab value="Completed" label="Completed" />
          <Tab value="Cancelled" label="Cancelled" />
        </Tabs>
        {!appointmentList?.some (appt => appt?.status === value) ? (
        <Box>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column' width="100%" marginTop={4}>
          <img src= {NotFoundImg} alt =" No appointments found"></img>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection= "column" width="100%" margin={4}>
            {value ==="Booked" ? (
          <h2>No appointments found! Click here to book an appointment</h2>) : value ==="Completed" ? (
            <h2>No completed appointments found!</h2> ) : ( <h2>No cancelled appointments found!</h2> )}
          <Button variant= "outlined" color="primary" href="/patient/book_appointment" onClick={bookAppt}>Book Appointment</Button>
          </Box>
        </Box>
      ) : (
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop:4,justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
              {appointmentList &&
          appointmentList.map((app, index) =>
            app.status === value ? (
                <ApptCardForList type="doctor" appt={app} />
            ) : null
          )}
      </Box> )}
    </Box>
    </Box>
  );
};
