import Button from '@mui/material/Button';

import './AppointmentDetail.css';
import DetailComponent from './DetailComponent';

function AppointmentDetail() {
  return (
    <div className="appointmentDetailsScreen">
      <div className="ScreenBody">
       <div className="half">
       <div className="patientCard">
          <div className="patientImage">
            <img src="https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg"></img>
          </div>
          <div className="patientDetails">
            <div className="docName"><p>Patient name</p></div>
            <div className="docSpeciality"><p>Age: 5</p></div>
            <div className="docExperience"><p>Phone: 12345678910</p></div>
          </div>
        </div>
        <DetailComponent/>
        
        </div>

      <div className="half">
      <div className='appointmentBtns'>
            <Button variant="contained" color="primary" style={{background: '#2854c3', marginBottom:'10px', width: '50%'}}>Reschedule Appointment</Button>
            <Button variant="contained" color="primary" style={{background: '#2854c3', width: '50%'}}>Cancel Appointment</Button>
        </div>
          </div>
        </div>
      </div>
  );
}

export default AppointmentDetail;
