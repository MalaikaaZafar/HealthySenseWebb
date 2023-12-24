
import './App.css';
import NavBar from './Components/NavBar';
//import AppointmentDetail from './DoctorLayout/AppointmentDetail';
import ManageAccount from './PatientLayout/Account/ManageAccount';
function App() {
  return (
    <div className="App">
      <NavBar/>
      <ManageAccount/>
    </div>
  );
}

export default App;
