import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {createContext, useContext} from 'react';

import DateIcon from '@mui/icons-material/DateRangeOutlined';
import TimeIcon from '@mui/icons-material/AccessTimeOutlined';
import { Button, Divider } from "@mui/material";

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
      }}
    >
        <div className="patientDetails" onClick={goToDetails} style={{ margin: "3%", width:'100%' }}>
          <appointmentContext.Provider value={appt}>
          {appt && type === "doctor" ? <DoctorDetails /> : <PatientDetails />}
          </appointmentContext.Provider>
         
        </div>
    </Card>
  );
}


function PatientDetails() {
  const appt=useContext(appointmentContext);
  return (
    <div className="user-card-img" style={{width:'100%', display:'flex', flexDirection:'row'}}>
    <Avatar
      style={{
        margin: "1%",
        margin: "5%",
        height: "75px",
        width: "75px",
        float: "left",
      }}
    >
      H
    </Avatar>
    <div className='apptCardInfo' style={{width:'100%',display:'flex', flexDirection:'column'}}>
    <div className="docName" style={{width:'100%', display:'flex', flexDirection:'row'}}>
      <p>{appt?.patientId?.user?.name}</p>
      <Divider orientation="vertical" flexItem sx={styles.div} />
      <p>Status: {appt?.status}</p>
    </div>
    <div className="docSpeciality">
            <p>Online Session</p>
          </div>
          <div className="docExperience" style={{width:'100%'}}> 
            <p style={{display:'flex', alignItems:'center', width: '100%'}}><TimeIcon sx={{margin: '1%'}}/>{appt?.time} </p>
            <p style={{display:'flex', alignItems:'center'}}><DateIcon sx={{margin: '1%'}}/>{appt?.date?  format(new Date(appt.date),'yyyy-MM-dd'):null}</p>
          </div>
    </div>
    </div>
  );
}

function DoctorDetails() {
  const appt=useContext(appointmentContext);
  return (
     <div className="user-card-img" style={{width:'100%'}}>
        <Avatar
          style={{
            margin: "1%",
            marginLeft: "3%",
            marginRight: "3%",
            height: "75px",
            width: "75px",
            float: "left",
          }}
        >
          H
        </Avatar>
    <div className="docName">
      <p>Dr. {appt?.doctorId?.user?.name}</p>
      <p>Status:  {appt?.status}</p>
    </div>
    <div className="docSpeciality">
      <p>Online Session</p>
        </div>
          <div className="docExperience" style={{width:'100%'}}> 
            <p style={{display:'flex', alignItems:'center', width: '100%'}}><TimeIcon sx={{margin: '2%'}}/>{appt?.time} </p>
            <p style={{display:'flex', alignItems:'center'}}><DateIcon sx={{margin: '2%'}}/>{appt?.date?  format(new Date(appt.date),'yyyy-MM-dd'):null}</p>
          </div>
          </div>
  );
}

const styles={
  div:{
    marginLeft:'10%',
    marginRight:'10%',
  }
}
export default AppointmentCard;
