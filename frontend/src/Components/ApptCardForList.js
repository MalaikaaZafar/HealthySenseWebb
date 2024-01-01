import { Card, Avatar, Button, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {createContext, useContext} from 'react';

import DateIcon from '@mui/icons-material/DateRangeOutlined';
import TimeIcon from '@mui/icons-material/AccessTimeOutlined';

import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

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
      sx={{
        minWidth: 300,
        maxWidth: 500,
        background: "white",
        borderRadius: 5,
        m: 1,
         p: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, height: 80, width: 80 }}>
          H
        </Avatar>
        <Box onClick={goToDetails} sx={{ m: 2 }}>
          <appointmentContext.Provider value={appt}>
            {type === "doctor" ? <DoctorDetails  /> : <PatientDetails />}
          </appointmentContext.Provider>
          <Box sx={{mb:1}}>
          <Box sx={{ display: 'flex', flexDirection:'row' }}>
                      {appt?.type === "Online" ? (
                      <VideoCameraFrontIcon sx={{ mx:1 }} />
                    ) : (
                      <NoteAltIcon sx={{ mx:1 }} />
                    )}
                  <Typography sx={{ display: "flex"}}>
                    {appt?.type ? appt.type : null} Session
                  </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection:'row' }}>
            <TimeIcon sx={{ mx: 1 }} />
            <Typography variant="body2">{appt?.time}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection:'row' }}>
          <DateIcon sx={{ mx: 1 }} />
            <Typography variant="body2">{appt?.date ? format(new Date(appt.date), "yyyy-MM-dd") : null}</Typography>
          </Box>
          </Box>
          <appointmentContext.Provider value={appt}>
            {appt.status === "Completed" || appt.status==="Cancelled" ? <IsComplete /> : <IsNotComplete type={type} Navigate={Navigate}/>}
          </appointmentContext.Provider>
        </Box>
      </Box>
    </Card>
  );
}

function IsComplete({ type, Navigate }){
  const appt=useContext(appointmentContext);
  return (
    <Button sx={{ color: "#3B86FF", textTransform: "none" , display: 'flex' , alignItems:'flex-end'}}>
      Leave Review
    </Button>
  );
}

function IsNotComplete({type, Navigate}) {
  const appt=useContext(appointmentContext);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Button
        onClick={(e) => {
          if (type==="doctor")
            Navigate(`/patient/appointments/cancel/${appt._id}`);
          else
            Navigate(`/doctor/appointments/cancel/${appt._id}`);
          e.stopPropagation();
        }}
        variant="contained"
        sx={{
          background: "#F4F9FB",
          color: "#3B86FF",
          border: "1px solid #3B86FF",
          m: 1,
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
        sx={{
          background: "#2854c3",
          color: "#f4f9fb",
          border: "1px solid #3B86FF",
          m: 1,
          textTransform: "none",
        }}
      >
        Reschedule
      </Button>
    </Box>
  );
}
function PatientDetails() {
  const appt=useContext(appointmentContext);
  const calcAge=()=>{
    return new Date().getFullYear()-new Date(appt.patientId.user.dob).getFullYear()
  }
  return (
    <Box sx={{m:1}}>
      <Typography variant="h6">{appt.patientId.user.name}</Typography>
      <Typography variant="body2">Age: {calcAge()}</Typography>
    </Box>
  );
}

function DoctorDetails() {
  const appt=useContext(appointmentContext);
  return (
    <Box sx={{m:1}}> 
      <Typography variant="h6">Dr. {appt?.doctorId?.user?.name}</Typography>
      <Typography variant="body2">{appt?.doctorId?.specialization}</Typography>
    </Box>
  );
}

export default ApptCardForList;
