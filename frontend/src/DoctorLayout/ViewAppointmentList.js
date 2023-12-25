import {React, useEffect, useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import ApptCardForList from '../Components/ApptCardForList';
import './ViewApptList.css';

async function fetchAppointments() {
    const appoinmentList= await fetch(`http://localhost:3000/doctor/consultations`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response =>  response.json());
    console.log(appoinmentList);
    return appoinmentList;
}

 function AppointmentList() {
  const [value, setValue] = useState('Booked');
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
<div className="apptListScreen">
     <Box sx={{justifyContent:'center', width:'100%'}} >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="Booked" label="Scheduled" style={{textTransform:'none'}} />
        <Tab value="Completed" label="Completed" style={{textTransform:'none'}} />
        <Tab value="Cancelled" label="Cancelled" style={{textTransform:'none'}} />
      </Tabs>
    </Box>
      <div className="apptListBody">
          <div className="apptList">
    {appointmentList && appointmentList.map((app, index) => 
        app.consult.status === value ? <div style={{ margin:'10px', width:'45%'}}><ApptCardForList key={index} type="doctor" appt={app}/></div> : null
  )}
    </div>
    </div>
    </div>
    
 
  );
}

export default AppointmentList;