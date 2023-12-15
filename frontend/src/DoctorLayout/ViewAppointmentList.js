import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import AppointmentCard from '../Components/AppointmentCard';

 function AppointmentList() {
  const [value, setValue] = React.useState('Scheduled');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

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
    {Array.from({ length: 5 }).map((_, index) => (
    <AppointmentCard key={index} type='doctor' status={value}/>
  ))}
    </Box>
    </Box>
 
  );
}

export default AppointmentList;