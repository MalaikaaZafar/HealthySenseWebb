
import './App.css';
import NavBar from './Components/NavBar';
//import AppointmentDetail from './DoctorLayout/AppointmentDetail';
//import ManageAccount from './DoctorLayout/Account/ManageAccount';
import ViewReport from './Components/Report/DownloadReport';
function App() {
  return (
    <div className="App">
      <ViewReport/>
    </div>
  );
}

export default App;
