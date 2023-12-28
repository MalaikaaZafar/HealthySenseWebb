import NavBar from './components/NavBar.js';

import CustomTabPanel from './doctorlayout/view_appointment_list/ViewAppointmentList.js'
import CancelAppointment from './doctorlayout/cancel_appointment/CancelAppointment.js';
import AppointmentSlots from './doctorlayout/appointment_slots/AppointmentSlots.js';
import RescheduleAppointment from './doctorlayout/reschedule_appointment/RescheduleAppointment.js';
import AppointmentDetail from './doctorlayout/view_appointment/AppointmentDetail.js';

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
import PatientManageAccount from './patientlayout/account/ManageAccount.js';
import DoctorManageAccount from './doctorlayout/account/ManageAccount.js';
import DiagnosisPage from './doctorlayout/diagnosis/DiagnosisPage.js';
import Payment from './patientlayout/payment/Payment.js';

import './App.css';
import ConfirmPayement from './patientlayout/payment/PaymentConfirm.js';
import { ThemeProvider } from '@emotion/react';
import theme from './Theme.js';
import AllReports from './patientlayout/reports/AllReports.js';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="*" element={<AllReports />} />
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
            <Route path='account' element={<DoctorManageAccount />} />
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
            <Route path='account' element={<PatientManageAccount />} />
          </Route>

          <Route path="/nag" element={<NavBar />}>
            <Route path='doctor-detail' element={<DoctorDeatil />} />
            <Route index element={<Search />} />
          </Route>

        </Routes>
      </div >
    </ThemeProvider>
  );
}

export default App;