import ChatIcon from "@mui/icons-material/ChatOutlined";
import CancelIcon from "@mui/icons-material/CancelOutlined";
import DoneIcon from "@mui/icons-material/DoneOutlined";
import ReschedIcon from "@mui/icons-material/EditCalendarOutlined";
import ReportIcon from "@mui/icons-material/AssessmentOutlined";
import DiagnosisIcon from "@mui/icons-material/MedicationOutlined";

import { List, ListItemButton, ListItemText } from "@mui/material";
import styled from "@emotion/styled";




const DoctorSidePanel = ({appt}) => {

    function rescheduleNav() {
        Navigate(`/doctor/appointments/reschedule/${appt._id}`);
      }
    
      function cancelNav() {
        Navigate(`/doctor/appointments/cancel/${appt._id}`);
      }
        
  <div className="buttonPanel">
    <List sx={styles.list}>
      <ListItemButton onClick={startChat}>
        <ChatIcon sx={styles.icon} />
        <ListItemText sx={styles.listItemText} primary="Start Chat" />
      </ListItemButton>
      <ListItemButton>
        <DoneIcon sx={styles.icon} />
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
  </div>;
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