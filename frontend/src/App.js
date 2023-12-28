import NavBar from './components/NavBar.js';

import CustomTabPanel from './DoctorLayout/view_appointment_list/ViewAppointmentList.js'
import CancelAppointment from './DoctorLayout/cancel_appointment/CancelAppointment.js';
import AppointmentSlots from './DoctorLayout/appointment_slots/AppointmentSlots.js';
import RescheduleAppointment from './DoctorLayout/reschedule_appointment/RescheduleAppointment.js';
import AppointmentDetail from './DoctorLayout/view_appointment/AppointmentDetail.js';

import ViewAllPatients from './adminlayout/ViewAllPatients.js';

import { RescheduleAppointment as ReschedulePatient } from './patientlayout/reschedule_appointment/RescheduleAppointment.js';
import { AppointmentList as AppointmentListPatient } from './patientlayout/view_appointment_list/ViewAppointmentList.js';
import { CancelAppointment as CancelPatientAppt } from './patientlayout/cancel_appointment/CancelAppointment.js';
import { AppointmentDetail as ApptDetail } from './patientlayout/view_appointment/AppointmentDetail.js';
import { BookAppointment } from './patientlayout/book_appointment/BookAppointment.js';

import { Messages } from './pages/messages/Messages.js';
import FAQ from './pages/faqs/FAQ.js';
import Search from './pages/user/Search.js';
import Favorites from './pages/patient/Favorites.js';
import AdminDoctor from './pages/admin/AdminDoctor.js';
import AdminPatient from './pages/admin/AdminPatient.js';
import AdminActivity from './pages/admin/AdminActivity.js';
import Login from './pages/auth/Login.js';
import Signup from './pages/auth/Signup.js';
import RegisterDoctor from './pages/auth/Register.js';
import DoctorDeatil from './pages/user/DoctorDetail.js';
import PatientDetail from './pages/doctor/PatientDetail.js';
import DoctorReview from './pages/patient/DoctorReview.js';

import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './Theme.js';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<RegisterDoctor />} />

          <Route path="/admin" element={<NavBar />}>
            <Route index element={<ViewAllPatients />} />
            <Route path="doctors" element={<AdminDoctor />} />
            <Route path='patients' element={<AdminPatient />} />
            <Route path='activity' element={<AdminActivity />} />
          </Route>

          <Route path="/doctor" element={<NavBar />}>
            <Route index element={<CustomTabPanel />} />
            <Route path="appointments/:id" element={<AppointmentDetail />} />
            <Route path="appointments" element={<CustomTabPanel />} />
            <Route path="appointments/cancel/:id" element={<CancelAppointment />} />
            <Route path="appointmentSlots" element={<AppointmentSlots />} />
            <Route path="appointments/reschedule/:id" element={<RescheduleAppointment />} />
            <Route path='patient-detail' element={<PatientDetail />} />
          </Route>

          <Route path='/patient' element={<NavBar />}>
            <Route index element={<Search />} />
            <Route index element={<AppointmentListPatient />} />
            <Route path='appointments' element={<AppointmentListPatient />} />
            <Route path='appointments/:id' element={<ApptDetail />} />
            <Route path='appointments/reschedule/:id' element={<ReschedulePatient />} />
            <Route path='appointments/cancel/:id' element={<CancelPatientAppt />} />
            <Route path='book-appointment/:id' element={<BookAppointment />} />
            <Route path='review' element={<DoctorReview />} />
            <Route path='favorites' element={<Favorites />} />
          </Route>

          <Route path="/" element={<NavBar />}>
            <Route path='doctor-detail' element={<DoctorDeatil />} />
            <Route index element={<Search />} />
          </Route>

        </Routes>
      </div >
    </ThemeProvider>
  );
}

export default App;