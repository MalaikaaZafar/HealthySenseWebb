import NavBar from './Components/NavBar.js';
import AppointmentDetail from './DoctorLayout/AppointmentDetail.js';
import CustomTabPanel from './DoctorLayout/ViewAppointmentList.js';
import CancelAppointment from './DoctorLayout/CancelAppointment.js';
import AppointmentSlots from './DoctorLayout/AppointmentSlots.js';
import RescheduleAppointment from './DoctorLayout/RescheduleAppointment.js';

import ViewAllPatients from './AdminLayout/ViewAllPatients.js';

import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<ViewAllPatients />}/>
        </Route>
        <Route path="/doctor" element={<NavBar />}>
          <Route index element={<CustomTabPanel />} />
          <Route path="/doctor/appointmentDetail" element={<AppointmentDetail />} />
          <Route path="/doctor/viewAppointmentList" element={<CustomTabPanel />} />
          <Route path="/doctor/cancelAppointment" element={<CancelAppointment />} />
          <Route path="/doctor/appointmentSlots" element={<AppointmentSlots />} />
          <Route path="/doctor/rescheduleAppointment" element={<RescheduleAppointment />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
