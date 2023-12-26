import React from 'react';
import { ThemeProvider} from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';

import NavBar from './Components/NavBar.js';
import AppointmentDetail from './DoctorLayout/AppointmentDetail.js';
import CustomTabPanel from './DoctorLayout/ViewAppointmentList.js';
import CancelAppointment from './DoctorLayout/CancelAppointment.js';
import AppointmentSlots from './DoctorLayout/AppointmentSlots.js';
import RescheduleAppointment from './DoctorLayout/RescheduleAppointment.js';
import Login from './pages/auth/Login.js';
import Signup from './pages/auth/Signup.js';
import RegisterDoctor from './pages/doctor/Register.js';
import theme from './Theme.js';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/signup" element={<Signup />} />
          <Route path="/doctor/register" element={<RegisterDoctor />} />
          <Route path="/doctor" element={<NavBar />}>
            <Route index element={<CustomTabPanel />} />
            <Route path="/doctor/appointmentDetail" element={<AppointmentDetail />} />
            <Route path="/doctor/viewAppointmentList" element={<CustomTabPanel />} />
            <Route path="/doctor/cancelAppointment" element={<CancelAppointment />} />
            <Route path="/doctor/appointmentSlots" element={<AppointmentSlots />} />
            <Route path="/doctor/rescheduleAppointment" element={<RescheduleAppointment />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;