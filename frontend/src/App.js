import NavBar from './Components/NavBar.js';
import AppointmentDetail from './DoctorLayout/AppointmentDetail.js';
import CustomTabPanel from './DoctorLayout/ViewAppointmentList.js';
import CancelAppointment from './DoctorLayout/CancelAppointment.js';
import AppointmentSlots from './DoctorLayout/AppointmentSlots.js';
import RescheduleAppointment from './DoctorLayout/RescheduleAppointment.js';

import ViewAllDoctors from './AdminLayout/ViewAllDoctors.js';
import ViewAllPatients from './AdminLayout/ViewAllPatients.js';

import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<AppointmentSlots />}/>
        </Route>
        <Route path="/admin" element={<NavBar />}>
          <Route index element={<ViewAllPatients />} />
          <Route path="doctors" element={<ViewAllDoctors />} />
          <Route path='patients' element={<ViewAllPatients />} />
        </Route>
        <Route path="/doctor" element={<NavBar />}>
          <Route index element={<CustomTabPanel />} />
          <Route path="appointments/:id" element={<AppointmentDetail />} />
          <Route path="appointments" element={<CustomTabPanel />} />
          <Route path="appointments/cancel/:id" element={<CancelAppointment />} />
          <Route path="appointmentSlots" element={<AppointmentSlots />} />
          <Route path="appointments/reschedule/:id" element={<RescheduleAppointment />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
