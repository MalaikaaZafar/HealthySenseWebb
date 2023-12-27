import NavBar from './components/NavBar.js';
import CustomTabPanel from './DoctorLayout/view_appointment_list/ViewAppointmentList.js'
import CancelAppointment from './DoctorLayout/cancel_appointment/CancelAppointment.js';
import AppointmentSlots from './DoctorLayout/appointment_slots/AppointmentSlots.js';
import RescheduleAppointment from './DoctorLayout/reschedule_appointment/RescheduleAppointment.js';
import AppointmentDetail from './DoctorLayout/view_appointment/AppointmentDetail.js';

import ViewAllDoctors from './adminlayout/ViewAllDoctors.js';
import ViewAllPatients from './adminlayout/ViewAllPatients.js';

import { RescheduleAppointment as ReschedulePatient } from './patientlayout/reschedule_appointment/RescheduleAppointment.js';
import { AppointmentList as AppointmentListPatient } from './patientlayout/view_appointment_list/ViewAppointmentList.js';
import { CancelAppointment as CancelPatientAppt } from './patientlayout/cancel_appointment/CancelAppointment.js';
import { AppointmentDetail as ApptDetail } from './patientlayout/view_appointment/AppointmentDetail.js';
import { BookAppointment } from './patientlayout/book_appointment/BookAppointment.js';

import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search.js';
import Favorites from './pages/Favorites.js';
import AdminDoctor from './pages/AdminDoctor.js';
import AdminPatient from './pages/AdminPatient.js';
import AdminActivity from './pages/AdminActivity.js';

import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import RegisterDoctor from './pages/RegisterDoctor.js';
import DoctorDeatils from './pages/DoctorDetails.js';
import PatientDetails from './pages/PatientDetails.js';
import DoctorReview from './pages/DoctorReview.js';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/doctor/register" element={<RegisterDoctor />} />
        <Route path='/doctor-detail' element={<DoctorDeatils />} />
        <Route path='/patient-detail' element={<PatientDetails />} />

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
        </Route>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Search />} />
          <Route path='favorites' element={<Favorites />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;