import PatientIcon from "@mui/icons-material/PeopleAltOutlined";
import ExperienceIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import "@fontsource/roboto";
import { Box, Typography, Button, Grid } from "@mui/material";

import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import DetailComponent from "../../components/DetailComponent";
import AppointmentCard from "../../components/AppointmentCard";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import { Container } from "@mui/system";

export const AppointmentDetail = () => {
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams();

  const date = appointment?.date;
  const fetchAppointment = async () => {
    try {
      const formattedStr = `http://localhost:3000/patient/consultations/${id}`;
      const appoinmentList = await axios
        .get(formattedStr)
        .then((response) => response.data);
      if (appoinmentList) setAppointment(appoinmentList);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAppointment();
    };
    fetchData();
  }, []);


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
            sx={{margin:3, backgroundColor: "#eeeeee", borderRadius: "10px" }}
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
           sx={{margin:3, backgroundColor: "#eeeeee", borderRadius: "10px" }}
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
            sx={{margin:3, backgroundColor: "#eeeeee", borderRadius: "10px" }}
          >
            <StarIcon fontSize="large" />
            <Typography variant="body1">
              <b>4.5</b>
            </Typography>
            <Typography variant="body2">Rating</Typography>
          </Box>
        </Grid>

      </Grid>
      <Box>
      {appointment && (
            <Box>
              <DetailComponent appt={appointment} user={"patient"} />
            </Box>
          )}
      </Box>
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
    width: "90%",
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
