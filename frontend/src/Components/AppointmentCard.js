import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {createContext, useContext} from 'react';

import DateIcon from '@mui/icons-material/DateRangeOutlined';
import TimeIcon from '@mui/icons-material/AccessTimeOutlined';

const appointmentContext=createContext();
function AppointmentCard({ type, appt }) {
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
            <p style={{display:'flex', alignItems:'center'}}><TimeIcon sx={{margin: '2%'}}/>{appt.time} </p>
            <p style={{display:'flex', alignItems:'center'}}><DateIcon sx={{margin: '2%'}}/>{format(new Date(appt.date), "yyyy-MM-dd")}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}


function PatientDetails() {
  const appt=useContext(appointmentContext);
  return (
    <div className="docName">
      <p>Name: {appt.patientId?.user?.name}</p>
      <p>Status: <b>{appt.status}</b></p>
    </div>
  );
}

function DoctorDetails() {
  const appt=useContext(appointmentContext);
  return (
    <div className="docName">
      <p>Dr. {appt.doctorId?.user?.name}</p>
      <p>Status:  {appt.status}</p>
    </div>
  );
}

export default AppointmentCard;
