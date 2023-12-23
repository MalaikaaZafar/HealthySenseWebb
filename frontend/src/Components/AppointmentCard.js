import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function AppointmentCard({ type, status }) {
  const Navigate = useNavigate();
  const goToDetails = (event) => {
    event.preventDefault();
    if (type === "doctor") {
      Navigate(`/doctor/appointmentDetail`);
    } else {
      Navigate(`/patient/appointmentDetail`);
    }
  }
  return (
    <Card
      variant="outlined"
      style={{
        width: "45%",
        background: "#F4F9FB",
        borderRadius: "10px",
        margin: "10px",
      }}
    >
      <div className="user-card-img">
        <Avatar
          style={{
            margin: "1%",
            marginLeft: "5%",
            marginRight: "5%",
            height: "75px",
            width: "75px",
            float: "left",
          }}
        >
          H
        </Avatar>
        <div className="patientDetails" onClick={goToDetails} style={{ margin: "3%" }}>
          {type === "doctor" ? <DoctorDetails /> : <PatientDetails />}
          <div className="docSpeciality">
            <p>Online Session</p>
          </div>
          <div className="docExperience">
            <p>09:30 am - 10:30 am (Tomorrow)</p>
          </div>
          {status === "Completed" || status==="Cancelled" ? <IsComplete /> : <IsNotComplete type={type} Navigate={Navigate}/>}
        </div>
      </div>
    </Card>
  );
}

function IsComplete({ type, Navigate }){
  return (
    <Button
      style={{background: "#F4F9FB", color: "#3B86FF", textTransform: "none" }}>
      Leave Review
    </Button>
  );
}

function IsNotComplete({type, Navigate}) {
  return (
    <div className="apptButtons">
      <Button
        onClick={(e) => {
          Navigate(`/doctor/cancelAppointment`);
          e.stopPropagation();
        }}
        variant="contained"
        style={{
          background: "#F4F9FB",
          color: "#3B86FF",
          border: "1px solid #3B86FF",
          margin: "1%",
          textTransform: "none",
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={(e) => {
          Navigate(`/doctor/rescheduleAppointment`);
          e.stopPropagation();
        }}
        variant="contained"
        style={{
          background: "#2854c3",
          color: "#f4f9fb",
          border: "1px solid #3B86FF",
          margin: "1%",
          textTransform: "none",
        }}
      >
        Reschedule
      </Button>
    </div>
  );
}
function PatientDetails() {
  return (
    <div className="docName">
      <p>Name: Patient name</p>
    </div>
  );
}

function DoctorDetails() {
  return (
    <div className="docName">
      <p>Dr. Amna Irum</p>
    </div>
  );
}

export default AppointmentCard;
