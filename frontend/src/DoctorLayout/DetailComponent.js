import './AppointmentDetail.css';
import TimeIcon from '@mui/icons-material/AccessTime';
import PatientIcon from '@mui/icons-material/PersonOutlineOutlined';
import ProblemIcon from '@mui/icons-material/DescriptionOutlined';
import FeeIcon from '@mui/icons-material/AttachMoneyOutlined';
function DetailComponent({timing, problem, fee, feeStatus}) {
  return (
    <div className="appointmentDetails">
       <p className="heading"><TimeIcon/> Appointment Timing</p>
    <div className="detail">
      <p >Morning</p>
      <p>Today-21 January, Friday</p>
      <p style={{color: "#2854C3", fontWeight: "bold"}}>{timing}</p>
      </div>
      <div>
       <p className="heading"><PatientIcon/> Doctor information </p>
       <div className="detail">
              <p>Dr. Amna Irum</p>
              <p>Nephrologist</p>
              <p>5+ Years of Experience</p>
        </div>
      </div>
      <div >
       <p className="heading"><ProblemIcon/>Problem Description </p>
       <div className="detail">
              <p>{problem}</p>
        </div>
      </div>
      <div >
      <p className="heading"><FeeIcon/> Fee information </p>
      <div className="detail" style={{marginBottom: '0px'}}>
              <p  style={{color: "#2854C3", fontWeight: "bold"}}>{feeStatus}</p>
              <p>{fee}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailComponent;
