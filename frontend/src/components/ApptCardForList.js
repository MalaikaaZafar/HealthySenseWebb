import { Card, Avatar, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { createContext, useContext } from "react";

import DateIcon from "@mui/icons-material/DateRangeOutlined";
import TimeIcon from "@mui/icons-material/AccessTimeOutlined";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Divider from "@mui/material/Divider";
const appointmentContext = createContext();

function ApptCardForList({ type, appt }) {
  const navigate = useNavigate();
  const goToDetails = (event) => {
    event.preventDefault();
    navigate(`${appt._id}`);
  };
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        maxWidth: 500,
        background: "white",
        borderRadius: 2,
        m: 1,
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", }}>
        <Avatar sx={{ mt: 4, ml:2, height: 80, width: 80 }}>H</Avatar>
        <Box onClick={goToDetails} sx={{ m: 2, flexGrow: 1 }}>
          <appointmentContext.Provider value={appt}>
            {type === "doctor" ? <DoctorDetails /> : <PatientDetails />}
          </appointmentContext.Provider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TimeIcon sx={{ mx: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {appt?.time}
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{mx:2}} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <DateIcon sx={{ mx: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {appt?.date ? format(new Date(appt.date), "yyyy-MM-dd") : null}
              </Typography>
            </Box>
          </Box>
          <appointmentContext.Provider value={appt}>
            {appt.status === "Completed" || appt.status === "Cancelled" ? (
              <IsComplete />
            ) : (
              <IsNotComplete type={type} navigate={navigate} />
            )}
          </appointmentContext.Provider>
        </Box>
      </Box>
    </Card>
  );
}

function IsComplete({ type, navigate }) {
  const appt = useContext(appointmentContext);

  return (
    <Box display="flex" flexDirection="row" width="100%">
    <Button
      sx={{
        color: "#3B86FF",
        textTransform: "none",
        alignSelf:'flex-end'
      }}
    >
      Leave a Review
    </Button>
    </Box>
  );
}

function IsNotComplete({ type, navigate }) {
  const appt = useContext(appointmentContext);
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Button
        onClick={(e) => {
          if (type === "doctor")
            navigate(
              `/${appt.patientId?.user?._id}/patient/appointments/cancel/${appt._id}`
            );
          else
            navigate(
              `/${appt.doctorId?.user?._id}/doctor/appointments/cancel/${appt._id}`
            );
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
          if (type === "doctor")
            navigate(
              `/${appt?.patientId?.user?._id}/patient/appointments/reschedule/${appt._id}`
            );
          else
            navigate(
              `/${appt?.doctorId?.user?._id}/doctor/appointments/reschedule/${appt._id}`
            );
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
  const appt = useContext(appointmentContext);
  const calcAge = () => {
    return (
      new Date().getFullYear() - new Date(appt.patientId.user.dob).getFullYear()
    );
  };
  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {appt.patientId.user.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Age: {calcAge()}
      </Typography>
    </Box>
  );
}

function DoctorDetails() {
  const appt = useContext(appointmentContext);
  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Dr. {appt?.doctorId?.user?.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {appt?.doctorId?.specialization}
      </Typography>
    </Box>
  );
}

export default ApptCardForList;
