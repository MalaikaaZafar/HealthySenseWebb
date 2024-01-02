import ChatIcon from "@mui/icons-material/ChatOutlined";
import CancelIcon from "@mui/icons-material/CancelOutlined";
import DoneIcon from "@mui/icons-material/DoneOutlined";
import ReschedIcon from "@mui/icons-material/EditCalendarOutlined";
import ReportIcon from "@mui/icons-material/AssessmentOutlined";
import DiagnosisIcon from "@mui/icons-material/MedicationOutlined";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import axios from "axios";
import { List, ListItemButton, ListItemText, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import api from "../services/api";

const DoctorSidePanel = ({ appt }) => {
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error");
  const [errorType, setErrorType] = useState("error");
  const Navigate = useNavigate();

  function rescheduleNav() {
    if (!appt.status === "Completed" && !appt.status === "Cancelled")
      Navigate(`/doctor/appointments/reschedule/${appt._id}`);
    else {
      setOpenError(true);
      setErrorMessage("You cannot reschedule a completed or cancelled appointment");
      setErrorType("error")
    }
  }

  function cancelNav() {
    if (!appt.status === "Completed" && !appt.status === "Cancelled")
      Navigate(`/doctor/appointments/cancel/${appt._id}`);
    else {
      setOpenError(true);
      setErrorMessage("You cannot cancel a completed or cancelled appointment");
      setErrorType("error")
    }
  }

  const markCompleted = async () => {
    if (appt.status === "Completed") {
      setOpenError(true);
      setErrorMessage("You cannot complete an already completed appointment");
      setErrorType("error")
    } else if (appt.status === "Cancelled") {
      setOpenError(true);
      setErrorMessage("You cannot complete a cancelled appointment");
      setErrorType("error")
    } else {
      const formattedStr = `/doctor/consultations/complete`;
      const res = await api.put(formattedStr, {
        id: appt._id,
      });
      if (res.data.message === "Success") {
        setOpenError(true);
        setErrorMessage("Appointment marked as completed");
        setErrorType("success")
        Navigate(`/doctor/appointments/${appt._id}`);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const startChat = () => {
    Navigate(`/messages/${appt.patientId._id}`);
  };

  const PatientHistory = () => {
    Navigate(`/${docId}/doctor/patient-history/${appt._id}/${appt.patientId._id}`);
  }

  const PatientDiagnosis = () => {
    Navigate(`/${docId}/doctor/diagnosis/${appt._id}`);
  }

  const PatientReport = () => {
    Navigate(`/${docId}/doctor/report/${appt._id}`);
  }

  const handleClose = (event, reason) => {
    setErrorMessage("");
    setOpenError(false);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        color: "white",
        width: { xs: "100%", md: "240px" },
        flexShrink: 0,
        position: "relative",
        height: { md: "100%", xs: "10%" },
        background: "#2854C3",
        boxShadow: "10px 0px 10px 0px rgba(0,0,0,0.2)",
      }}
    >
      <List sx={styles.list}>
        <ListItemButton onClick={startChat}>
          <ChatIcon sx={styles.icon} />
          <ListItemText primary="Start Chat" sx={styles.listItemText} />
        </ListItemButton>
        <ListItemButton onClick={markCompleted}>
          <DoneIcon sx={styles.icon} />
          <ListItemText primary="Mark as Completed" sx={styles.listItemText} />
        </ListItemButton>
        <ListItemButton onClick={rescheduleNav}>
          <ReschedIcon sx={styles.icon} />
          <ListItemText primary="Reschedule" sx={styles.listItemText} />
        </ListItemButton>
        <ListItemButton onClick={cancelNav}>
          <CancelIcon sx={styles.icon} />
          <ListItemText primary="Cancel" sx={styles.listItemText} />
        </ListItemButton>
        <ListItemButton onClick={PatientHistory}>
          <MedicalServicesIcon sx={styles.icon} />
          <ListItemText primary="History" sx={styles.listItemText} />
        </ListItemButton>
        <ListItemButton onClick={PatientDiagnosis}>
          <DiagnosisIcon sx={styles.icon} />
          <ListItemText primary="Diagnosis" sx={styles.listItemText} />
        </ListItemButton>
        <ListItemButton onClick={PatientReport}>
          <ReportIcon sx={styles.icon} />
          <ListItemText primary="Report" sx={styles.listItemText} />
        </ListItemButton>
      </List>
      <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose} >
        <MuiAlert elevation={6} variant="filled" severity={errorType}>
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

const styles = {
  button: {
    background: "#2854c3",
    width: "50%",
    margin: "2%",
    padding: "10px",
    color: "white",
    fontSize: "1rem",
    textTransform: "none",
    borderRadius: "10px",
    "&:hover": {
      boxShadow: "10px 0px 10px 0px rgba(0,0,0,0.5)",
      background: "#2854c3",
    },
  },
  icon: {
    color: "white",
    margin: "10px",
  },
  list: {
    color: "white",
    display: "flex",
    flexDirection: { xs: "row", md: "column" },
    width: { xs: "100%", md: "240px" },
  },
  listItemText: {
    color: "white",
    width: "100%",
    display: { xs: "none", md: "flex" },
  },
};

export default DoctorSidePanel;
