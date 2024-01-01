import { React, useEffect, useState } from "react";


import { Container, Box, Tabs, Tab } from '@mui/material';

import ApptCardForList from "../../components/ApptCardForList";
import api from "../../services/api";

const fetchAppointments = async () => {
  const appoinmentList = await api.get(`/patient/consultations`)
  .then((response) => response.data);
  return appoinmentList;
};

export const AppointmentList = () => {
  const [value, setValue] = useState("Booked");
  const [appointmentList, setAppointmentList] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    <Container width="100%">
      <Box display="flex" justifyContent="center" width="100%">
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
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop:4,justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
              {appointmentList &&
          appointmentList.map((app, index) =>
            app.status === value ? (
              // <Box key={index} width="50%" >
                <ApptCardForList type="doctor" appt={app} />
              // </Box>
            ) : null
          )}
      </Box>
    </Container>
  );
};
