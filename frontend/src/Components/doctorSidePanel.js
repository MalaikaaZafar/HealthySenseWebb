import ChatIcon from "@mui/icons-material/ChatOutlined";
import CancelIcon from "@mui/icons-material/CancelOutlined";
import DoneIcon from "@mui/icons-material/DoneOutlined";
import ReschedIcon from "@mui/icons-material/EditCalendarOutlined";
import ReportIcon from "@mui/icons-material/AssessmentOutlined";
import DiagnosisIcon from "@mui/icons-material/MedicationOutlined";
import axios from "axios";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./doctorSidePanel.css";
const DoctorSidePanel = ({ appt }) => {
  const Navigate = useNavigate();

  function rescheduleNav() {
    if (!appt.status ==="Completed" && !appt.status ==="Cancelled")
      Navigate(`/doctor/appointments/reschedule/${appt._id}`);
    else alert("Cannot reschedule a completed/cancelled appointment");
  }

  function cancelNav() {
    if (!appt.status ==="Completed" && !appt.status ==="Cancelled")
    Navigate(`/doctor/appointments/cancel/${appt._id}`);
    else alert("Cannot cancel a completed/cancelled appointment");
  }

  const markCompleted = async() => {
    if (appt.status === "Completed") {
      alert("You have already completed this appointment");
    } else if (appt.status === "Cancelled") {
      alert("You cannot complete a cancelled appointment");
    }
    else
    {
      const formattedStr = `http://localhost:3000/doctor/consultations/complete`;
      const res = await axios.put(formattedStr, {
        id: appt._id,
      });
  
      console.log(res);
      if (res.data.message === "Success") {
        alert("Appointment marked as completed");
        Navigate(`/doctor/appointments/${appt._id}`);
      } else {
        alert("Something went wrong");
      }
    }

    
  };

    const startChat = () => {
    Navigate(`/messages/${appt.patientId._id}`);
    }

   return ( 
  <div className="buttonPanel">
    <List sx={styles.list}>
      <ListItemButton onClick={startChat}>
        <ChatIcon sx={styles.icon} />
        <ListItemText sx={styles.listItemText} primary="Start Chat" />
      </ListItemButton>
      <ListItemButton>
        <DoneIcon sx={styles.icon} onClick={markCompleted}/>
        <ListItemText sx={styles.listItemText} primary="Mark as Completed" />
      </ListItemButton>
      <ListItemButton onClick={rescheduleNav}>
        <ReschedIcon sx={styles.icon} />
        <ListItemText sx={styles.listItemText} primary="Reschedule" />
      </ListItemButton>
      <ListItemButton onClick={cancelNav}>
        <CancelIcon sx={styles.icon} />
        <ListItemText sx={styles.listItemText} primary="Cancel" />
      </ListItemButton>
      <ListItemButton>
        <DiagnosisIcon sx={styles.icon} />
        <ListItemText sx={styles.listItemText} primary="Diagnosis" />
      </ListItemButton>
      <ListItemButton>
        <ReportIcon sx={styles.icon} />
        <ListItemText sx={styles.listItemText} primary="Report" />
      </ListItemButton>
    </List>
  </div>
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
    width: "100%",
    display: "flex",
    flexDirection: { sx: "row", md: "column" },
  },
  listItemText: {
    color: "white",
    width: "100%",
    display: { xs: "none", md: "flex" },
  },
};

export default DoctorSidePanel;
