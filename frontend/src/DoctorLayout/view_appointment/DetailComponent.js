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
       <p className="heading"><TimeIcon sx={styles.icon}/> Appointment Timing</p>
    <div className="detail">
      <p >{getTiming}</p>
      <p>{format(new Date(appt?.date), "yyyy-MM-dd")}</p>
      <p style={{color: "#2854C3", fontWeight: "bold"}}>{appt?.time}</p>
      </div>
      <div >
       <p className="heading"><ProblemIcon sx={styles.icon}/>Problem Description </p>
       <div className="detail">
              <p>{appt.problem}</p>
        </div>
      </div>
      <div >
       <p className="heading"><ProblemIcon sx={styles.icon}/>Patient information </p>
       <div className="detail">
              <p>Blood Group: {appt?.patientId?.bloodGroup}</p>
        </div>
      </div>
      <div >
      <p className="heading"><FeeIcon sx={styles.icon}/> Fee information </p>
      <div className="detail" style={{marginBottom: '0px'}}>
              <p style={{color: "#2854C3", fontWeight: "bold"}}>{appt.paymentStatus? appt.paymentStatus:'N/A'}</p>
              {appt.doctorId.session.map((session)=>{
                if (session.type===appt.type)
                {
                  return <p>Fee: {session.fee}</p>
                }
              })}
        </div>
      </div>
    </div>
  );
}


const styles={
  icon:{
    marginRight:'5px',
  }
}
export default DetailComponent;
