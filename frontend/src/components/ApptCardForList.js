import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {createContext, useContext} from 'react';

import DateIcon from '@mui/icons-material/DateRangeOutlined';
import TimeIcon from '@mui/icons-material/AccessTimeOutlined';

const appointmentContext=createContext();
function ApptCardForList({ type, appt }) {
  const Navigate = useNavigate();
  const goToDetails = (event) => {
    event.preventDefault();
    if (type === "doctor") {
       Navigate(`/patient/appointments/${appt._id}`);
    } else {
      Navigate(`/doctor/appointments/${appt._id}`);
    }
  }
  return (
    <Card
      variant="outlined"
      style={{
        width: "100%",
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
          <appointmentContext.Provider value={appt}>
          {type === "doctor" ? <DoctorDetails /> : <PatientDetails />}
          </appointmentContext.Provider>
          <div className="docSpeciality">
            <p>Online Session</p>
          </div>
          <div className="docExperience">
            <p style={{display:'flex', alignItems:'center'}}><TimeIcon sx={{margin: '2%'}}/>{appt?.time} </p>
            <p style={{display:'flex', alignItems:'center'}}><DateIcon sx={{margin: '2%'}}/>{appt?.date? format(new Date(appt.date), "yyyy-MM-dd"): null}</p>
          </div>
          <appointmentContext.Provider value={appt}>
          {appt.status === "Completed" || appt.status==="Cancelled" ? <IsComplete /> : <IsNotComplete type={type} Navigate={Navigate}/>}
          </appointmentContext.Provider>
        </div>
      </div>
    </Card>
  );
}

function IsComplete({ type, Navigate }){
  const appt=useContext(appointmentContext);
  return (
    <Button
      style={{background: "#F4F9FB", color: "#3B86FF", textTransform: "none" }}>
      Leave Review
    </Button>
  );
}

function IsNotComplete({type, Navigate}) {
  const appt=useContext(appointmentContext);
  return (
    <div className="apptButtons" style={{display:'flex', flexDirection:'row'}}>
      <Button
        onClick={(e) => {
          if (type==="doctor")
            Navigate(`/patient/appointments/cancel/${appt._id}`);
          else
            Navigate(`/doctor/appointments/cancel/${appt._id}`);
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
          if (type==="doctor")
            Navigate(`/patient/appointments/reschedule/${appt._id}`);
          else
          Navigate(`/doctor/appointments/reschedule/${appt._id}`);
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
  const appt=useContext(appointmentContext);
  const calcAge=()=>{
    return new Date().getFullYear()-new Date(appt.patientId.user.dob).getFullYear()
  }
  return (
    <div className="docName">
      <p>{appt.patientId.user.name}</p>
      <p>Age: {calcAge()}</p>
    </div>
  );
}

function DoctorDetails() {
  const appt=useContext(appointmentContext);
  return (
    <div className="docName">
      <p>Dr. {appt?.doctorId?.user?.name}</p>
      <p>{appt?.doctorId?.specialization}</p>
    </div>
  );
}

export default ApptCardForList;
