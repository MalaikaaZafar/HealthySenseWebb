import NavBar from './components/NavBar.js';
import CustomTabPanel from './doctorlayout/ViewAppointmentList.js';
import CancelAppointment from './doctorlayout/CancelAppointment.js';
import AppointmentSlots from './doctorlayout/AppointmentSlots.js';
import RescheduleAppointment from './doctorlayout/RescheduleAppointment.js';
import AppointmentDetail from './doctorlayout/AppointmentDetail.js';

import ViewAllDoctors from './adminlayout/ViewAllDoctors.js';
import ViewAllPatients from './adminlayout/ViewAllPatients.js';

import {RescheduleAppointment as ReschedulePatient} from './patientlayout/malaika/RescheduleAppointment.js';
import {AppointmentList as AppointmentListPatient} from './patientlayout/malaika/ViewAppointmentList.js';
import { CancelAppointment as CancelPatientAppt } from './patientlayout/malaika/CancelAppointment.js';
import { AppointmentDetail as ApptDetail} from './patientlayout/malaika/AppointmentDetail.js';
import { BookAppointment } from './patientlayout/malaika/BookAppointment.js';

import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search.js';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<BookAppointment />}/>
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

        <Route path='/patient' element={<NavBar />}>
          <Route index element={<AppointmentListPatient />} />
          <Route path='appointments' element={<AppointmentListPatient />} />
          <Route path='appointments/:id' element={<ApptDetail />} />
          <Route path='appointments/reschedule/:id' element={<ReschedulePatient />} />
          <Route path='appointments/cancel/:id' element={<CancelPatientAppt />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;
