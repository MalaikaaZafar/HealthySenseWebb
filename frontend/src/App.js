import NavBar from './Components/NavBar';
import AppointmentList from './Doctorlayout/ViewAppointmentList';
import CancelAppointment from './Doctorlayout/CancelAppointment';
import AppointmentSlots from './Doctorlayout/AppointmentSlots';
import RescheduleAppointment from './Doctorlayout/RescheduleAppointment';
import AppointmentDetail from './Doctorlayout/AppointmentDetail.js';

import ViewAllDoctors from './Adminlayout/ViewAllDoctors';
import ViewAllPatients from './Adminlayout/ViewAllPatients';

import {RescheduleAppointment as ReschedulePatient} from './Patientlayout/RescheduleAppointment';
import {AppointmentList as AppointmentListPatient} from './Patientlayout/ViewAppointmentList';
import { CancelAppointment as CancelPatientAppt } from './Patientlayout/CancelAppointment';
import { AppointmentDetail as ApptDetail} from './Patientlayout/AppointmentDetail';


import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search.js';
import Cookies from './Cookies.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="*" element={<Cookies />} />
        <Route path="/nav" element={<NavBar />}>
          <Route index element={<AppointmentSlots />}/>
        </Route>
        <Route path="/admin" element={<NavBar />}>
          <Route index element={<ViewAllPatients />} />
          <Route path="doctors" element={<ViewAllDoctors />} />
          <Route path='patients' element={<ViewAllPatients />} />
        </Route>
        <Route path="/doctor" element={<NavBar />}>
          <Route index element={<AppointmentList />} />
          <Route path="appointments/:id" element={<AppointmentDetail />} />
          <Route path="appointments" element={<AppointmentList />} />
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
