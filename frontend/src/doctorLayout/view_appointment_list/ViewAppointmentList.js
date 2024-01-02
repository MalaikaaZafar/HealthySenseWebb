import {React, useEffect, useState} from 'react';
import { Box, Container, Tab, Tabs, Typography } from '@mui/material';

import ApptCardForList from '../../components/ApptCardForList';
import api from '../../services/api';
import NotFoundImg from './404Illustration.png'; 

async function fetchAppointments() {
  try{
    const formattedStr= `/doctor/consultations`;
    const appoinmentList= await api.get(formattedStr).then((response) => response.data);
    if(appoinmentList.message=== 'Success')
    {
        return appoinmentList.appt;
    }
    else
    {
        return null;
    }
  }catch(error){
    console.log(error);
    alert("Something went wrong");
  }
}

 function AppointmentList() {
  const [value, setValue] = useState('Booked');
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
    <Box width="100%">
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          <Tab value="Booked" label="Scheduled" sx={{ textTransform: 'none' }} />
          <Tab value="Completed" label="Completed" sx={{ textTransform: 'none' }} />
          <Tab value="Cancelled" label="Cancelled" sx={{ textTransform: 'none' }} />
        </Tabs>
      </Box>
      {!appointmentList?.some (appt => appt?.status === value) ? (
        <Box>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection='column' width="100%" marginTop={4}>
          <img src= {NotFoundImg} alt =" No appointments found"></img>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection= "column" width="100%" margin={4}>
            {value ==="Booked" ? (
          <h2>No appointments found! Click here to book an appointment</h2>) : value ==="Completed" ? (
            <h2>No completed appointments found!</h2> ) : ( <h2>No cancelled appointments found!</h2> )}
          </Box>
        </Box>
      ) : (
        <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems:'center', justifyContent:'center' }}>
        {appointmentList && appointmentList.map((app, index) => 
          app?.status === value ? (
              <ApptCardForList type="patient" appt={app} />
          ) : null
        )}
      </Box>
    </Box>)}
    </Box>
  );
}

export default AppointmentList;