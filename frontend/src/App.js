import NavBar from './Components/NavBar.js';
import AppointmentDetail from './DoctorLayout/AppointmentDetail.js';
import UserCard from './Components/UserCard.js';
import CustomTabPanel from './DoctorLayout/ViewAppointmentList.js';
import { AppBar } from '@mui/material';
import AppointmentCard from './Components/AppointmentCard.js';
function App() {
  return (
    <div className="App">
      <NavBar/>
      <CustomTabPanel/>
    </div>
  );
}

export default App;
