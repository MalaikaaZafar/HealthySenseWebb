import "@fontsource/roboto";
import {
  Grid,
  Box,
  Container,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import PatientIcon from "@mui/icons-material/PeopleAltOutlined";
import ExperienceIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import CancelIcon from "@mui/icons-material/EventBusyOutlined";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useImmer } from "use-immer";

import AppointmentCard from "../../components/AppointmentCard";
import api from "../../services/api";

export const CancelAppointment = () => {
  const [reason, setReason] = useState("Something urgent came up");
  const [appointment, setAppointment] = useImmer(null);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const { id } = useParams();

  const fetchAppointment = async () => {
    try {
      const formattedStr = `/patient/consultations/${id}`;
      const appoinmentList = await api.get(formattedStr).then((response) => response.data);
      setAppointment(appoinmentList);
    }
    catch (err) {
      alert(err);
    }
  };


    const cancelAppointment=async ()=>{
        if (appointment.status!=="Cancelled"){
        try{
        const formattedStr = `/patient/consultations/cancel`;
        const appointmentList= await api.put(formattedStr, {id: id, reason: reason}).then((response) => response.data);
        if (appointmentList.message==="Success")
        {
          setOpen(true);
          setAppointment(draft=>{
            draft.status="Cancelled";
            draft.updateReason=reason;
          })
        }
        else 
        {
          alert("Something went wrong"); 
        }}
        catch(err){
          alert("Something went wrong");
        }
      } else {
        setOpenError(true);
      }
    
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAppointment();
      if (data) {
        setAppointment(data);
      }
    };
    fetchData();
  }, []);

  function setReasonHandler(event) {
    setReason(event.target.value);
  }

  const handleCloseErr = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErr(false);
  };

  return (
    <Container>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12} sm={6}>
          {appointment && <AppointmentCard type="doctor" appt={appointment} />}
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="70%"
            padding="10px"
            sx={{ margin: 3, backgroundColor: "#eeeeee", borderRadius: "10px" }}
          >
            <PatientIcon fontSize="large" />
            <Typography variant="body1">
              <b>90</b>
            </Typography>
            <Typography variant="body2">Patients</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="70%"
            padding="10px"
            sx={{ margin: 3, backgroundColor: "#eeeeee", borderRadius: "10px" }}
          >
            <ExperienceIcon fontSize="large" />
            <Typography variant="body1">
              <b>{appointment?.doctorId?.experience} Years</b>
            </Typography>
            <Typography variant="body2">Experience</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="70%"
            padding="10px"
            sx={{ margin: 3, backgroundColor: "#eeeeee", borderRadius: "10px" }}
          >
            <StarIcon fontSize="large" />
            <Typography variant="body1">
              <b>4.5</b>
            </Typography>
            <Typography variant="body2">Rating</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        sx={{
          background: "#eeeeee",
          mt: 2,
          mb: 0,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Grid item xs={12} sm={6}>
          <Container sx={{ width: "80%", mx: "auto" }}>
            <Typography variant="h6" component="div" color="primary">
              Reason for Cancelling Appointment
            </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Something urgent came up"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="Something urgent came up"
                  control={<Radio />}
                  label="Something urgent came up"
                  onChange={setReasonHandler}
                />
                <FormControlLabel
                  value="I'm not feeling well"
                  control={<Radio />}
                  label="I'm not feeling well"
                  onChange={setReasonHandler}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  onChange={setReasonHandler}
                />
              </RadioGroup>
            </FormControl>
            <Box
              component="textarea"
              rows={10}
              disabled={
                reason !== "Something urgent came up" &&
                reason !== "I'm not feeling well"
                  ? false
                  : true
              }
              onChange={setReasonHandler}
              sx={{ width: "80%", borderRadius: "10px", p: 1, mx: "auto" }}
            />
          </Container>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={dayjs(appointment?.date)}
              readOnly
              disabled
              sx={{
                "& .Mui-selected": {
                  backgroundColor:
                    appointment?.status === "Cancelled"
                      ? "red"
                      : appointment?.status === "Booked"
                      ? "#2854C3"
                      : "green",
                },
              }}
            />
          </LocalizationProvider>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              onClick={cancelAppointment}
              variant="contained"
              color="primary"
              sx={{
                width: "50%",
                textTransform: "none",
                borderRadius: "10px",
                padding: "10px",
                mx: "auto",
                mb: 2,
                background: "#2854C3",
                "&:hover": {
                  background: "#2854C3",
                  boxShadow: "10 10 10 0 rgba(0, 0, 0, 0.15)",
                },
              }}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleCloseError}>
        <MuiAlert severity="success" elevation={6} variant="filled">
          Your appointment has been cancelled successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={1000}
        onClose={handleCloseError}
      >
        <MuiAlert severity="error" elevation={6} variant="filled">
          Your appointment was already cancelled
        </MuiAlert>
      </Snackbar>
      <Snackbar open={openErr} autoHideDuration={500} onClose={handleCloseErr}>
        <MuiAlert elevation={6} variant="filled" severity="error">
          Please fill all the fields!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};
