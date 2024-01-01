import PatientIcon from "@mui/icons-material/PeopleAltOutlined";
import ExperienceIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined";
import TimeIcon from "@mui/icons-material/AccessTime";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import "@fontsource/roboto";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DoctorCard2 from "../../components/DoctorCardMalaika";

import "@fontsource/roboto";
import { format } from "date-fns";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import api from "../../services/api";

export const BookAppointment = () => {
  const [doctor, setDoctor] = useState(null);
  const [type, setType] = useState("Online");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [problem, setProblem] = useState(null);
  const [groupedSlots, setGroupedSlots] = useState(null);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const [appt, setAppt] = useState(null);



  const groupSlotsByDate = (slotData) => {
    const groupedSlots = {};
    if (slotData && slotData.length !== 0) {
    if (slotData && slotData.length !== 0) {
      slotData.forEach((slot) => {
        let date = slot.date;
        date = format(new Date(date), "yyyy-MM-dd");
        if (!groupedSlots[date]) {
          groupedSlots[date] = [];
        }
        groupedSlots[date].push(slot);
      });
    }
  }
    return groupedSlots;
  };

  const Navigate = useNavigate();
  const setDate = (event) => {
    setSelectedDate(event.target.value);
    setSelectedTime(null);
  };
  const setTime = (event) => {
    setSelectedTime(event.target.value);
  };
  const setReasonHandler = (event) => {
    setProblem(event.target.value);
  };

  const fetchAppointment = async () => {
    try {
      const formattedStr = `/patient/doctors/658aeab2a07cfdec21fc4931`;
      const doctorObj = await api
        .get(formattedStr)
        .then((response) => response.data);
      if (doctorObj.message === "Success") {
        setDoctor(doctorObj.doctor);
        const grp = groupSlotsByDate(doctorObj?.doctor?.appointmentSlots);
        setGroupedSlots(grp);
      }
    } catch (err) {
      alert(err);
    }
  };

  const bookAppt = async () => {
    if (selectedDate && selectedTime && problem) {
      try {
        const resched = await api
          .post("/patient/consultations/bookAppt", {
            patientId: "6585484c797f80875a8a769c",
            doctorId: doctor._id,
            date: selectedDate,
            time: selectedTime,
            problem: problem,
            type: type,
          })
          .then((response) => response.data);
        if (resched.message === "Success") {
          setOpen(true);
          setAppt(resched.id);
        }
      } catch (err) {
        alert(err);
      }
    } else {
      setOpenErr(true);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchAppointment();
    };
    fetchData();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    Navigate(`/patient/appointments/${appt}`);
  };

  const handleCloseErr = (event, reason) => {
    setOpenErr(false);
  };
  return (
    <Container sx={{ mt: 2 }}>
      <Box>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item md={6} sm={12} display="flex" alignItems="center">
            {doctor && <DoctorCard2 user={doctor} />}
          </Grid>
          <Grid item xs={3} sm={4} md={2}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="50%"
              padding="10px"
              sx={{
                margin: 3,
                backgroundColor: "#eeeeee",
                borderRadius: "10px",
              }}
            >
              <PatientIcon fontSize="large" />
              <Typography variant="body1">
                <b>90</b>
              </Typography>
              <Typography variant="body2">Patients</Typography>
            </Box>
          </Grid>
          <Grid item xs={3} sm={4} md={2}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="50%"
              padding="10px"
              sx={{
                margin: 3,
                backgroundColor: "#eeeeee",
                borderRadius: "10px",
              }}
            >
              <ExperienceIcon fontSize="large" />
              <Typography variant="body1">
                <b>{doctor?.experience} Years</b>
              </Typography>
              <Typography variant="body2">Experience</Typography>
            </Box>
          </Grid>
          <Grid item xs={3} sm={4} md={2}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="50%"
              padding="10px"
              sx={{
                margin: 3,
                backgroundColor: "#eeeeee",
                borderRadius: "10px",
              }}
            >
              <StarIcon fontSize="large" />
              <Typography variant="body1">
                <b>4.5</b>
              </Typography>
              <Typography variant="body2">Rating</Typography>
            </Box>
          </Grid>
        </Grid>
        <Container
          sx={{
            display: "flex",
            flexDirection: { md: "row", sm: "column", xs: "column" },
            background: " #eeeeee",
            padding: 2,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            gap: 2,
            marginTop: 4,
          }}
        >
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{ textAlign: "center" }}
            >
              Select Session Type{" "}
            </Typography>
            {doctor?.session &&
              doctor?.session.map((session) => {
                return (
                  <Card
                    onClick={() => {
                      setType(session.type);
                    }}
                    sx={{
                      display: "flex",
                      mb: 2,
                      mt: 1,
                      width: "80%",
                      color: type === session.type ? "white" : "#2854C3",
                      background: type === session.type ? "#2854C3" : "white",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      onClick={() => {
                        setType(session.type);
                      }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {session.type === "Online" ? (
                        <VideoCameraFrontIcon
                          sx={{
                            color: type === session.type ? "white" : "#2854C3",
                            ml: 1,
                          }}
                        />
                      ) : (
                        <NoteAltIcon
                          sx={{
                            color: type === session.type ? "white" : "#2854C3",
                            ml: 1,
                          }}
                        />
                      )}
                    </Box>
                    <CardContent
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      padding="0px"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Typography variant="body1" sx={{ mr: 10 }}>
                          {session.type} Session
                        </Typography>
                        <Typography variant="body1">
                          Rs. {session.fee} /Session
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
          </Box>

          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="h5"
              color="primary"
              sx={{ textAlign: "center" }}
            >
              Select Date And Time{" "}
            </Typography>
            <FormControl sx={styles.selector} required>
              <InputLabel sx={styles.text}>
                <CalendarIcon sx={styles.icon2} /> YYYY - MM - DD
              </InputLabel>
              <Select
                labelId="date-label"
                id="demo-simple-select-filled"
                value={selectedDate ? selectedDate : ""}
                onChange={setDate}
              >
                {groupedSlots &&
                  Object.keys(groupedSlots).map(
                    (slot) =>
                      groupedSlots[slot].some(
                        (x) => x.availability === true && x.type === type
                      ) && (
                        <MenuItem key={slot} value={slot}>
                          {slot}
                        </MenuItem>
                      )
                  )}
              </Select>
            </FormControl>
            <FormControl sx={styles.selector} required>
              <InputLabel id="time-label" sx={styles.text}>
                <TimeIcon sx={styles.icon2} />
                HH:MM (AM/PM)
              </InputLabel>
              <Select
                labelId="time-label"
                value={selectedTime ? selectedTime : ""}
                onChange={setTime}
              >
                {selectedDate &&
                  groupedSlots &&
                  groupedSlots[selectedDate].map(
                    (slot) =>
                      slot.availability === true &&
                      slot.type === type && (
                        <MenuItem key={slot.time} value={slot.time}>
                          {slot.time}
                        </MenuItem>
                      )
                  )}
              </Select>
            </FormControl>

            <FormControl sx={styles.selector} required>
              <textarea
                rows={10}
                placeholder="Describe your problem here..."
                value={problem ? problem : ""}
                disabled={selectedDate && selectedTime ? false : true}
                onChange={setReasonHandler}
                style={{ borderRadius: "10px", padding: "10px" }}
              ></textarea>
            </FormControl>
            <Button onClick={bookAppt} variant="contained" sx={styles.button}>
              Book Appointment
            </Button>
          </Box>
        </Container>
      </Box>
      <Snackbar open={open} autoHideDuration={500} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled">
          Your appointment has been booked successfully!
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

const styles = {
  button: {
    color: "white",
    backgroundColor: "#2854C3",
    "&:hover": {
      backgroundColor: "#2854C3",
      boxShadow: "10px 0px 10px 10px rgba(0, 0, 0, 0.10)",
      cursor: "pointer",
    },
    borderRadius: "10px",
    padding: "10px 20px",
    width: "50%",
    marginTop: "5%",
    fontSize: "smaller",
    textTransform: "none",
  },
  icon: {
    fontSize: "30px",
    margin: "5%",
    verticalAlign: "middle",
  },
  selector: {
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px",
    background: "white",
  },
  text: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon2: {
    marginRight: "5px",
  },
  card: {
    width: "100%",
    margin: "1%",
    textAlign: "center",
    borderRadius: "10px",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#F4F8FB",
      boxShadow: "10px 0px 10px 0px rgba(0, 0, 0, 0.10)",
    },
  },
  cardSelected: {
    width: "100%",
    margin: "1%",
    backgroundColor: "#2854c3",
    color: "white",
    borderRadius: "10px",
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
};
