import NavBar from './Components/NavBar.js';
import AppointmentDetail from './DoctorLayout/AppointmentDetail.js';
import CustomTabPanel from './DoctorLayout/ViewAppointmentList.js';
import CancelAppointment from './DoctorLayout/CancelAppointment.js';
import AppointmentSlots from './DoctorLayout/AppointmentSlots.js';
import RescheduleAppointment from './DoctorLayout/RescheduleAppointment.js';

import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search.js';
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/doctor" element={<NavBar />}>
          <Route index element={<CustomTabPanel />} />
          <Route path="appointmentDetail" element={<AppointmentDetail />} />
          <Route path="viewAppointmentList" element={<CustomTabPanel />} />
          <Route path="cancelAppointment" element={<CancelAppointment />} />
          <Route path="appointmentSlots" element={<AppointmentSlots />} />
          <Route path="rescheduleAppointment" element={<RescheduleAppointment />} />
        </Route>

      </Routes>
    </div >
  );
}

export default App;
