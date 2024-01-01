import NavBar from './components/NavBar.js';
import CustomTabPanel from './doctorLayout/view_appointment_list/ViewAppointmentList.js'
import CancelAppointment from './doctorLayout/cancel_appointment/CancelAppointment.js';
import AppointmentSlots from './doctorLayout/appointment_slots/AppointmentSlots.js';
import RescheduleAppointment from './doctorLayout/reschedule_appointment/RescheduleAppointment.js';
import AppointmentDetail from './doctorLayout/view_appointment/AppointmentDetail.js';
import { RescheduleAppointment as ReschedulePatient } from './patientLayout/reschedule_appointment/RescheduleAppointment.js';
import { AppointmentList as AppointmentListPatient } from './patientLayout/view_appointment_list/ViewAppointmentList.js';
import { CancelAppointment as CancelPatientAppt } from './patientLayout/cancel_appointment/CancelAppointment.js';
import { AppointmentDetail as ApptDetail } from './patientLayout/view_appointment/AppointmentDetail.js';
import { BookAppointment } from './patientLayout/book_appointment/BookAppointment.js';
import Meet from './pages/meet/Meet.js';
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
import PatientManageAccount from './patientLayout/Account/ManageAccount.js';
import DoctorManageAccount from './doctorLayout/Account/ManageAccount.js';
import DiagnosisPage from './doctorLayout/Diagnosis/DiagnosisPage.js';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './Theme.js';
import ViewReportDoctor from './pages/report/ViewReportDoctor.js';
import DocNavbar from './components/DocNavbar.js';
import AdminNavbar from './components/AdminNavbar.js';
import NotFoundPage from './pages/NotFound.jsx';
import Payment from './patientLayout/Payment/Payment.js';
import AllReports from './patientLayout/reports/AllReports.js';
import PatientHistory from './pages/doctor/PatientHisttory.js';
import ViewReportPatient from './pages/report/ViewReportPatient.js';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import FAQ from './pages/faqs/FAQ.js';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:id/register" element={<RegisterDoctor />} />
          <Route path="/:id/meet" element={<Meet />} />
          <Route path="/admin" element={<AdminNavbar />}>
            <Route path='' index element={<AdminActivity />} />
            <Route path="doctors" element={<AdminDoctor />} />
            <Route path='patients' element={<AdminPatient />} />
          </Route>
          <Route path="/:id/doctor" element={<ProtectedRoute />}>
            <Route element={<DocNavbar />}>

              <Route index element={<CustomTabPanel />} />
              <Route path="appointments/:id" element={<AppointmentDetail />} />
              <Route path="appointments" element={<CustomTabPanel />} />
              <Route path="appointments/cancel/:id" element={<CancelAppointment />} />
              <Route path="appointmentSlots" element={<AppointmentSlots />} />
              <Route path="appointments/reschedule/:id" element={<RescheduleAppointment />} />
              <Route path='patient-detail' element={<PatientDetail />} />
              <Route path='patient-history/:appid/:patid' element={<PatientHistory />} />
              <Route path='account' element={<DoctorManageAccount />} />
              <Route path='diagnosis/:appid' element={<DiagnosisPage />} />
              <Route path='report/:appid' element={<ViewReportDoctor />} />
            </Route>
          </Route>

          <Route path='/:id/patient' element={<ProtectedRoute />}>
            <Route element={<NavBar />}>
              <Route index element={<Search />} />
              <Route path='appointments' element={<AppointmentListPatient />} />
              <Route path='appointments/:id' element={<ApptDetail />} />
              <Route path='appointments/reschedule/:id' element={<ReschedulePatient />} />
              <Route path='appointments/cancel/:id' element={<CancelPatientAppt />} />
              <Route path='book-appointment/:docId' element={<BookAppointment />} />
              <Route path='reports' element={<AllReports />} />
              <Route path='payment/:appid' element={<Payment />} />
              <Route path='your-report/:diagid' element={<ViewReportPatient />} />
              <Route path='review' element={<DoctorReview />} />
              <Route path="account" element={<PatientManageAccount />} />
              <Route path='favorites' element={<Favorites />} />
              <Route path='doctor-detail' element={<DoctorDetail />} />
              <Route path='faq' element={<FAQ />} />
            </Route>
          </Route>
          <Route path="/" element={<NavBar />}>
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div >
    </ThemeProvider>
  );
}

export default App;