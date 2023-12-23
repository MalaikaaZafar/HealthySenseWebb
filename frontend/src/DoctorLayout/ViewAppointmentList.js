import {React, useEffect, useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import AppointmentCard from '../Components/AppointmentCard';

async function fetchAppointments() {
    const appoinmentList= await fetch(`http://localhost:3000/doctor/consultations`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify(
        //     {UserId: '1'}
        // ),
    }).then(response =>  response.json());
    return appoinmentList;
}

 function AppointmentList() {
  const [value, setValue] = useState('Scheduled');
  const [appointmentList, setAppointmentList] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
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
  <Box sx={{width: '100%'}} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
   <Box >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="Scheduled" label="Scheduled" style={{textTransform:'none'}} />
        <Tab value="Completed" label="Completed" style={{textTransform:'none'}} />
        <Tab value="Cancelled" label="Cancelled" style={{textTransform:'none'}} />
      </Tabs>
    </Box>
    <Box style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap', width: '80%'}}>
    {appointmentList && appointmentList.map((app, index) => (
    <AppointmentCard key={index} type='doctor' status={app.status} date={app.date} time={app.time}/>
  ))}
    </Box>
    </Box>
 
  );
}

export default AppointmentList;