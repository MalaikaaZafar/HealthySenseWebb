import NavBar from './components/NavBar.js';
<<<<<<< HEAD

import CustomTabPanel from './doctorlayout/view_appointment_list/ViewAppointmentList.js'
import CancelAppointment from './doctorlayout/cancel_appointment/CancelAppointment.js';
import AppointmentSlots from './doctorlayout/appointment_slots/AppointmentSlots.js';
import RescheduleAppointment from './doctorlayout/reschedule_appointment/RescheduleAppointment.js';
import AppointmentDetail from './doctorlayout/view_appointment/AppointmentDetail.js';

import ViewAllPatients from './adminlayout/ViewAllPatients.js';

=======
import CustomTabPanel from './DoctorLayout/view_appointment_list/ViewAppointmentList.js'
import CancelAppointment from './DoctorLayout/cancel_appointment/CancelAppointment.js';
import AppointmentSlots from './DoctorLayout/appointment_slots/AppointmentSlots.js';
import RescheduleAppointment from './DoctorLayout/reschedule_appointment/RescheduleAppointment.js';
import AppointmentDetail from './DoctorLayout/view_appointment/AppointmentDetail.js';
>>>>>>> abdullah
import { RescheduleAppointment as ReschedulePatient } from './patientlayout/reschedule_appointment/RescheduleAppointment.js';
import { AppointmentList as AppointmentListPatient } from './patientlayout/view_appointment_list/ViewAppointmentList.js';
import { CancelAppointment as CancelPatientAppt } from './patientlayout/cancel_appointment/CancelAppointment.js';
import { AppointmentDetail as ApptDetail } from './patientlayout/view_appointment/AppointmentDetail.js';
import { BookAppointment } from './patientlayout/book_appointment/BookAppointment.js';
<<<<<<< HEAD

import { Messages } from './pages/messages/Messages.js';
import Meet from './pages/meet/Meet.js';
=======
import { Routes, Route } from 'react-router-dom';
>>>>>>> abdullah
import Search from './pages/user/Search.js';
import Favorites from './pages/patient/Favorites.js';
import AdminDoctor from './pages/admin/AdminDoctor.js';
import AdminPatient from './pages/admin/AdminPatient.js';
import AdminActivity from './pages/admin/AdminActivity.js';
import Login from './pages/auth/Login.js';
import Signup from './pages/auth/Signup.js';
import RegisterDoctor from './pages/auth/Register.js';
import DoctorDetail from './pages/user/DoctorDetail.js';
import PatientDetail from './pages/doctor/PatientDetail.js';
import DoctorReview from './pages/patient/DoctorReview.js';


import { Routes, Route } from 'react-router-dom';
import PatientManageAccount from './patientlayout/account/ManageAccount.js';
import DoctorManageAccount from './doctorlayout/account/ManageAccount.js';
import DiagnosisPage from './doctorlayout/diagnosis/DiagnosisPage.js';
import Payment from './patientlayout/payment/Payment.js';

import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './Theme.js';
<<<<<<< HEAD
import AllReports from './patientlayout/reports/AllReports.js';
import ViewReportPatient from './pages/report/ViewReportPatient.js';
import ViewReportDoctor from './pages/report/ViewReportDoctor.js';
import PatientHistory from './pages/doctor/PatientHisttory.js';
=======
import ViewAllPatients from './adminlayout/ViewAllPatients.js';
import DocNavbar from './components/DocNavbar.js';
import AdminNavbar from './components/AdminNavbar.js';
import NotFoundPage from './pages/NotFound.jsx';
>>>>>>> abdullah

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="*" element={<DiagnosisPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<RegisterDoctor />} />
          <Route path="/meet" element={<Meet />} />

          <Route path="/admin" element={<AdminNavbar />}>
            <Route path='' index element={<AdminActivity />} />
            <Route path="doctors" element={<AdminDoctor />} />
            <Route path='patients' element={<AdminPatient />} />
          </Route>
<<<<<<< HEAD

          <Route path="/doctor" element={<NavBar />}>
=======
          <Route path="/doctor" element={<DocNavbar />}>
>>>>>>> abdullah
            <Route index element={<CustomTabPanel />} />
            <Route path="appointments/:id" element={<AppointmentDetail />} />
            <Route path="appointments" element={<CustomTabPanel />} />
            <Route path="appointments/cancel/:id" element={<CancelAppointment />} />
            <Route path="appointmentSlots" element={<AppointmentSlots />} />
            <Route path="appointments/reschedule/:id" element={<RescheduleAppointment />} />
            <Route path='patient-detail' element={<PatientDetail />} />
            <Route path='account' element={<DoctorManageAccount />} />
            <Route path='diagnosis' element={<DiagnosisPage />} />
            <Route path='report/:id' element={<ViewReportDoctor />} />
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
<<<<<<< HEAD
            <Route path='favorites' element={<Favorites />} />
            <Route path='account' element={<PatientManageAccount />} />
            <Route path='payment' element={<Payment />} />
            <Route path='reports' element={<AllReports />} />
            <Route path='report/:id' element={<ViewReportPatient />} />
          </Route>

          <Route path="/nag" element={<NavBar />}>
            <Route path='doctor-detail' element={<DoctorDeatil />} />
            <Route index element={<Search />} />
            <Route path='messages/:id' element={<Messages />} />          
        </Route>

=======
          </Route>
          <Route path="/" element={<NavBar />}>
            <Route path='doctor-detail' element={<DoctorDetail />} />
            <Route path='favorites' element={<Favorites />} />
            <Route index element={<Search />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
>>>>>>> abdullah
        </Routes>
      </div >
    </ThemeProvider>
  );
}

export default App;