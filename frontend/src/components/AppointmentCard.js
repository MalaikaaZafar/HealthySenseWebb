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
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Dot from "@mui/icons-material/FiberManualRecord";
import MessageIcon from "@mui/icons-material/MessageOutlined";
const appointmentContext = createContext();

function AppointmentCard({ type, appt }) {
  const navigate = useNavigate();
  const goToDetails = (event) => {
    event.preventDefault();
    if (type === "doctor") {
      navigate(`/patient/appointments/${appt._id}`);
    } else {
      navigate(`/doctor/appointments/${appt._id}`);
    }
  };

  const openMessages=(e)=>{
    console.log(appt)
    e.stopPropagation();
    if (type === "doctor") {
    navigate(`/messages/${appt?.patientId?.user?._id}`)
    }
    else{
      navigate(`/messages/${appt?.doctorId?.user?._id}`)
    }
  }


  return (
    <Card
      variant="outlined"
      onClick={goToDetails}
      sx={{
        minWidth:'300px',
        maxWidth:'100%',
        background: "#white",
        borderRadius: 3,
        margin: 1,
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
      }}
    >
      <Container
        
        sx={{ margin: 0, marginTop: 4, marginBottom: 4, width: "100%" }}
      >
          <Box sx={{ width: "100%", display: "flex", flexDirection: {xs:'column', sm:'row'}, alignItems:'center', justifyContent:'center' }}>
            <Avatar sx={{ margin: 2, height: "75px", width: "75px" }}>H</Avatar>
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <Box
                sx={{ width: "100%", display: "flex", flexDirection: "row", mb:2 }}
              >
                <Typography width="100%" variant="h5" sx={{mx:3}}>
                  {type === "doctor"
                    ? "Dr. " + appt?.doctorId?.user?.name : appt?.patientId?.user?.name
                    }
                </Typography>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginLeft: "auto" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      color:
                        appt.status === "Booked"
                          ? "#2854C3"
                          : appt.status === "Completed"
                          ? "green"
                          : "red",
                      display: "flex",
                      alignItems: "center",
                      ml: "auto",
                      mr:5,
                    }}
                  >
                    <Dot sx={{ fontSize: "smaller", mr: 1 }} />
                    <Typography variant="caption" sx={{  }}>
                      {appt?.status}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Container
                sx={{
                  display: "flex",
                
                  flexDirection: "row",
                 width:'100%',
                 alignItems:'center',
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ width: "100%", margin:0 }}>
                  <Typography sx={{ display: "flex"}}>
                    {appt?.type === "Online" ? (
                      <VideoCameraFrontIcon sx={{ marginRight: "1%" }} />
                    ) : (
                      <NoteAltIcon sx={{ marginRight: "1%" }} />
                    )}
                    {appt?.type ? appt.type : null} Session
                  </Typography>
                  <Typography
                    sx={{
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <TimeIcon sx={{ marginRight: "1%" }} />
                    {appt?.time}
                  </Typography>
                  <Typography sx={{ display: "flex"}}>
                    <DateIcon sx={{ marginRight: "1%" }} />
                    {appt?.date
                      ? format(new Date(appt?.date), "yyyy-MM-dd")
                      : null}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Button
                    onClick={openMessages}
                    variant="contained"
                    sx={{ margin: 1, background: "#2854C3" }}
                    startIcon={<MessageIcon />}
                  >
                    Chat
                  </Button>
                </Box>
              </Container>
            </Box>
          </Box>
      </Container>
    </Card>
  );
}

export default AppointmentCard;
