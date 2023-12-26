import './AppointmentDetail.css';
import TimeIcon from '@mui/icons-material/AccessTime';
import PatientIcon from '@mui/icons-material/PersonOutlineOutlined';
import ProblemIcon from '@mui/icons-material/DescriptionOutlined';
import FeeIcon from '@mui/icons-material/AttachMoneyOutlined';
import { format } from 'date-fns';

const DetailComponent = ({appt}) => {

  function calcAge()
  {
      var today = new Date();
      var birthDate = new Date(appt.patientId.user.dob);
      return today.getFullYear() - birthDate.getFullYear();
  }

  return (
    <div className="appointmentDetails">
       <p className="heading"><TimeIcon/> Appointment Timing</p>
    <div className="detail">
      <p>{format(appt.date,'yyyy-MM-dd')}</p>
      <p style={{color: "#2854C3", fontWeight: "bold"}}>{appt.time}</p>
      </div>
      <div >
       <p className="heading"><PatientIcon/> Patient information </p>
       <div className="detail">
              <p>Name: {appt.patientId.user.name}</p>
              <p>Age: {calcAge()}</p>
              <p>Phone: {appt.patientId.user.phoneNumber}</p>
        </div>
      </div>
      <div >
       <p className="heading"><ProblemIcon/> Problem Description </p>
       <div className="detail">
              <p>{appt.problem}</p>
        </div>
      </div>
      <div >
      <p className="heading"><FeeIcon/> Fee information </p>
      <div className="detail" style={{marginBottom: '0px'}}>
       
              <p style={{color: "#2854C3", fontWeight: "bold"}}>Paid</p>
              <p>{appt.doctorId.fee}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailComponent;
