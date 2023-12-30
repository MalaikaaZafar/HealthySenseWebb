import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { createContext, useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Card,
  Container,
  Button,
} from "@mui/material";
import TimeIcon from "@mui/icons-material/AccessTime";
import DateIcon from "@mui/icons-material/DateRange";
import Online from '@mui/icons-material/VideocamOutlined';
import Dot from '@mui/icons-material/FiberManualRecord';
import MessageIcon from '@mui/icons-material/MessageOutlined';
const appointmentContext = createContext();

function AppointmentCard({ type, appt }) {
  const Navigate = useNavigate();
  const goToDetails = (event) => {
    event.preventDefault();
    if (type === "doctor") {
      Navigate(`/patient/appointments/${appt._id}`);
    } else {
      Navigate(`/doctor/appointments/${appt._id}`);
    }
  };
  return (
    <Card
      variant="outlined"
      sx={{
        maxwidth: "400px",
        minWidth: "80%",
        background: "#F4F9FB",
        borderRadius: "10px",
        margin: 2,
      }}
    >
      <Container
        onClick={goToDetails}
        sx={{ margin: 0, marginTop: 4, marginBottom: 4, width: "100%" }}
      >
        <appointmentContext.Provider value={appt}>
          {appt && type === "doctor" ? <DoctorDetails /> : <PatientDetails />}
        </appointmentContext.Provider>
      </Container>
    </Card>
  );
}

function PatientDetails() {
  const appt = useContext(appointmentContext);
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <Avatar sx={{ margin: 2, height: "75px", width: "75px" }}>H</Avatar>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <Typography width="100%" variant="h5">Dr. {appt?.patientId?.user?.name}</Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginLeft: "auto" }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Box sx={{color: appt.status==="Booked"?  "#2854C3": appt.status==="Completed"?"green":"red", display:"flex", alignItems:"center"}}>
              <Dot sx={{fontSize:"smaller", mr:1}}/>
              <Typography variant="caption" sx={{ ml: "auto" }}>
              {appt?.status}
            </Typography>
            </Box>
          </Box>
        </Box>
        <Typography>{appt?.type} Session</Typography>
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <TimeIcon sx={{ margin: "1%" }} />
            {appt?.time}
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            <DateIcon sx={{ margin: "1%" }} />
            {appt?.date ? format(new Date(appt?.date), "yyyy-MM-dd") : null}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

function DoctorDetails() {
  const appt = useContext(appointmentContext);
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <Avatar sx={{ margin: 2, height: "75px", width: "75px" }}>H</Avatar>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <Typography width="100%" variant="h5">Dr. {appt?.doctorId?.user?.name}</Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ marginLeft: "auto" }}
          />
<Box
  sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", width: "100%" }}
>
  <Box sx={{color: appt.status==="Booked"?  "#2854C3": appt.status==="Completed"?"green":"red", display:"flex", alignItems:"center"}}>
    <Dot sx={{fontSize:"smaller", mr:1}}/>
    <Typography variant="caption" sx={{ ml: "auto" }}>
      {appt?.status}
    </Typography>
  </Box>
</Box>
        </Box>
        <Typography>{appt?.type} Session</Typography>
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <TimeIcon sx={{ margin: "1%" }} />
            {appt?.time}
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            <DateIcon sx={{ margin: "1%" }} />
            {appt?.date ? format(new Date(appt?.date), "yyyy-MM-dd") : null}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AppointmentCard;
