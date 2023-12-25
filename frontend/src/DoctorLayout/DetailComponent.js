import './AppointmentDetail.css';
import { format } from "date-fns";

import TimeIcon from '@mui/icons-material/AccessTime';
import PatientIcon from '@mui/icons-material/PersonOutlineOutlined';
import ProblemIcon from '@mui/icons-material/DescriptionOutlined';
import FeeIcon from '@mui/icons-material/AttachMoneyOutlined';

function DetailComponent({appt}) {
  function getTiming(){
    if (appt.time.includes("AM"))
    {
      return "Morning"
    }
    else{
      return "Evening"
    }
  }


  return (
    <div className="appointmentDetails">
       <p className="heading"><TimeIcon/> Appointment Timing</p>
    <div className="detail">
      <p >{getTiming}</p>
      <p>{format(new Date(appt.consult.date), "yyyy-MM-dd")}</p>
      <p style={{color: "#2854C3", fontWeight: "bold"}}>{appt.consult.time}</p>
      </div>
      <div>
       <p className="heading"><PatientIcon/> Doctor information </p>
       <div className="detail">
              <p>Dr. {appt.docOrPatient.user.name} </p>
              <p>{appt.docOrPatient.details.specialization}</p>
              <p>5+ Years of Experience</p>
        </div>
      </div>
      <div >
       <p className="heading"><ProblemIcon/>Problem Description </p>
       <div className="detail">
              <p>{appt.consult.problem}</p>
        </div>
      </div>
      <div >
      <p className="heading"><FeeIcon/> Fee information </p>
      <div className="detail" style={{marginBottom: '0px'}}>
              <p style={{color: "#2854C3", fontWeight: "bold"}}>{appt.fee?.status? appt.fee.status:'N/A'}</p>
              <p>{appt.fee?.amount? appt.fee.amount: "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailComponent;
