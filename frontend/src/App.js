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
import Favorites from './pages/patient/Favorites.jsx';
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
import { Messages } from './pages/messages/Messages.js';
import Footer from './components/Footer.jsx';
import AboutUs from './pages/about/AboutUs.jsx';
import { Box } from '@mui/system';
import { useLocation } from 'react-router-dom';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box flexGrow={1}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<RegisterDoctor />} />
            <Route path="/:id/meet" element={<Meet />} />

            <Route path="/:adminId/admin" element={<ProtectedRoute />}>
              <Route element={<AdminNavbar />}>
                <Route path='' index element={<AdminActivity />} />
                <Route path="doctors" element={<AdminDoctor />} />
                <Route path='patients' element={<AdminPatient />} />
                <Route path='doctor-detail/:docId' element={<DoctorDetail type='admin' />} />
              </Route>
            </Route>

            <Route path="/:docId/doctor" element={<ProtectedRoute />}>
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
                <Route path='doctor-detail' element={<DoctorDetail type='doctor' />} />
                <Route path='messages' element={<Messages />} />
                <Route path="messages/:id" element={<Messages />} />
              </Route>
            </Route>

            <Route path='/:patientId/patient' element={<ProtectedRoute />}>
              <Route element={<NavBar />}>
                <Route index element={<Search />} />
                <Route path='appointments' element={<AppointmentListPatient />} />
                <Route path='appointments/:id' element={<ApptDetail />} />
                <Route path='appointments/reschedule/:id' element={<ReschedulePatient />} />
                <Route path='appointments/cancel/:id' element={<CancelPatientAppt />} />
                <Route path='book-appointment/:id' element={<BookAppointment />} />
                <Route path='reports' element={<AllReports />} />
                <Route path='payment/:appid' element={<Payment />} />
                <Route path='your-report/:diagid' element={<ViewReportPatient />} />
                <Route path='review' element={<DoctorReview />} />
                <Route path="account" element={<PatientManageAccount />} />
                <Route path='favorites' element={<Favorites />} />
                <Route path='doctor-detail/:docId' element={<DoctorDetail type='patient' />} />
                <Route path='faq' element={<FAQ />} />
                <Route path='messages' element={<Messages />} />
                <Route path="messages/:id" element={<Messages />} />
                <Route path='about' element={<AboutUs />} />
              </Route>
            </Route>

            <Route path="/" element={<NavBar />}>
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>

        </Box>
        <WithFooter />
      </Box >
    </ThemeProvider >
  );
}

function WithFooter({ children }) {
  const location = useLocation();
  const noFooterRoutes = ['/login', '/signup', '/register', '/:id/meet'];

  return (
    <>
      {children}
      {!noFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;