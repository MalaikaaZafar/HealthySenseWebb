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
    <div className="appointmentDetailsPatient">
       <p className="headingPatient"><TimeIcon/> Appointment Timing</p>
    <div className="detailPatient">
      <p>{format(new Date(appt.date),'yyyy-MM-dd')}</p>
      <p style={{color: "#2854C3", fontWeight: "bold"}}>{appt?.time}</p>
      </div>
      <div >
       <p className="headingPatient"><PatientIcon/> Doctor Information </p>
       <div className="detailPatient">
              <p>Specialization: {appt.doctorId.specialization}</p>
              <p>Experience: {appt.doctorId.experience}</p>
              <p>Working Hours: {appt.doctorId.workingHours}</p>
        </div>
      </div>
      <div >
       <p className="headingPatient"><ProblemIcon/> Problem Description </p>
       <div className="detailPatient">
              <p>{appt.problem}</p>
        </div>
      </div>
      <div >
      <p className="headingPatient"><FeeIcon/> Fee information </p>
      <div className="detailPatient" style={{marginBottom: '0px'}}>
       
              <p style={{color: "#2854C3", fontWeight: "bold"}}>{appt.paymentStatus}</p>
              {
                appt.doctorId.session.map((sess) => {
                  if (sess.type===appt.type){
                    return <p>Rs. {sess.fee}</p>
                  }
                })
              }
        </div>
      </div>
    </div>
  );
}

export default DetailComponent;
