import NavBar from './components/NavBar.js';
import CustomTabPanel from './doctorlayout/ViewAppointmentList.js';
import CancelAppointment from './doctorlayout/CancelAppointment.js';
import AppointmentSlots from './doctorlayout/AppointmentSlots.js';
import RescheduleAppointment from './doctorlayout/RescheduleAppointment.js';
import AppointmentDetail from './doctorlayout/AppointmentDetail.js';

import ViewAllDoctors from './adminlayout/ViewAllDoctors.js';
import ViewAllPatients from './adminlayout/ViewAllPatients.js';

import {RescheduleAppointment as ReschedulePatient} from './patientlayout/RescheduleAppointment.js';
import {AppointmentList as AppointmentListPatient} from './patientlayout/ViewAppointmentList.js';
import { CancelAppointment as CancelPatientAppt } from './patientlayout/CancelAppointment.js';
import { AppointmentDetail as ApptDetail} from './patientlayout/AppointmentDetail.js';


import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search.js';
import PatientManageAccount from './patientlayout/account/ManageAccount.js';
import DoctorManageAccount from './doctorlayout/account/ManageAccount.js';
import DiagnosisPage from './doctorlayout/diagnosis/DiagnosisPage.js';
import Payment from './patientlayout/payment/Payment.js';

import './App.css';
import ConfirmPayement from './patientlayout/payment/PaymentConfirm.js';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route index path="*" element={<Payment />} />
        <Route path="/nav" element={<NavBar />}>
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
          <Route path="account" element={<DoctorManageAccount />} />
        </Route>

        <Route path='/patient' element={<NavBar />}>
          <Route index element={<AppointmentListPatient />} />
          <Route path='appointments' element={<AppointmentListPatient />} />
          <Route path='appointments/:id' element={<ApptDetail />} />
          <Route path='appointments/reschedule/:id' element={<ReschedulePatient />} />
          <Route path='appointments/cancel/:id' element={<CancelPatientAppt />} />
          <Route path='account' element={<PatientManageAccount />} />
          <Route path='diagnosis/:id' element={<DiagnosisPage />} />
          <Route path='payment' element={<Payment />} />
          <Route path='payment/confirm' element={<ConfirmPayement />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;
