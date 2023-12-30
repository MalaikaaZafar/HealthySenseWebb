import PatientIcon from "@mui/icons-material/PeopleAltOutlined";
import ExperienceIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import ClinicIcon from "./healthIcons.svg";
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined";
import TimeIcon from "@mui/icons-material/AccessTime";
import "@fontsource/roboto";

import { Form, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import  DoctorCard  from "../../components/DoctorCard";

import "./BookAppointment.css";
import Button from "@mui/material/Button";
import "@fontsource/roboto";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { format } from "date-fns";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";


export const BookAppointment = () => {
  const [doctor, setDoctor] = useState(null);
  const [type, setType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [problem, setProblem] = useState(null);
  const [groupedSlots, setGroupedSlots] = useState(null);
  const { id } = useParams();

  const groupSlotsByDate = (slotData) => {
    console.log(slotData);
    const groupedSlots = {};
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
    return groupedSlots;
  };

  const Navigate = useNavigate();

  //Input handlers
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
  const setOnline = () => {
    setType("Online");
  }
  const setClinic = () => {
    setType("Clinic");
  }

  
  const fetchAppointment = async () => {
    try {
      const formattedStr = `http://localhost:3000/patient/doctors/658aeab2a07cfdec21fc4989`;
      const doctorObj = await axios
        .get(formattedStr)
        .then((response) => response.data);
      if (doctorObj.message === "Success") {
        setDoctor(doctorObj.doctor);
        const grp=groupSlotsByDate(doctorObj.doctor.appointmentSlots);
        setGroupedSlots(grp);
      }
    } catch (err) {
      alert(err);
    }
  };

  const bookAppt = async () => {
    try{
        const resched=await axios.post("http://localhost:3000/patient/consultations/bookAppt", ({
          patientId:"6585484c797f80875a8a769c",
          doctorId:doctor._id,
          date: selectedDate,
          time: selectedTime,
          problem: problem,
          type:type,
        }))
        .then(response=>response.data);
        if (resched.message==="Success") {
          Navigate(`/patient/appointments/${resched.id}`);
        }
    }
    catch(err){
        alert(err);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await fetchAppointment();
    };
    fetchData();
  }, []);

  const reschedAppt = () => {
    Navigate(`/patient/appointments/reschedule/${id}`);
  };

  const cancelAppt = () => {
    Navigate(`/patient/appointments/cancel/${id}`);
  };
  return (
    <div className="bookApptScreen">
      <div className="bookApptScreenBody">
        <div className="bookApptTop">
          {doctor && (
            <div className="bookApptTopLeft">
              <DoctorCard user={doctor} />
            </div>
          )}
          <div className="bookApptTopRight">
            <div className="bookApptRight">
              <PatientIcon sx={styles.icon} />
              <p>
                <b>90</b>
              </p>
              <p>Patients</p>
            </div>
            <div className="bookApptRight">
              <ExperienceIcon sx={styles.icon} />
              <p>
                <b>{doctor?.experience} Years</b>
              </p>
              <p> Experience</p>
            </div>
            <div className="bookApptRight">
              <StarIcon sx={styles.icon} />
              <p>
                <b>4.5</b>
              </p>
              <p>Rating</p>
            </div>
          </div>
        </div>
        <div className="bookApptBottom">
          <div className="bookApptSlotSelector">
            <div className="apptTypeSelect">
              <Card 
              onClick={setOnline}
              sx={type === "Online" ? styles.cardSelected : styles.card}>
                <CardContent>Online Session</CardContent>
              </Card>
              <Card
              onClick={setClinic}
                sx={type === "Clinic" ? styles.cardSelected : styles.card}>
                <CardContent>Clinic Session</CardContent>
              </Card>
            </div>
            <FormControl sx={styles.selector}>
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
                  Object.keys(groupedSlots).map((slot) => (
                    <MenuItem key={slot} value={slot}>
                      {slot}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={styles.selector}>
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
                      slot.availability === true && slot.type===type && (
                        <MenuItem key={slot.time} value={slot.time}>
                          {slot.time}
                        </MenuItem>
                      )
                  )}
              </Select>
            </FormControl>

            <FormControl sx={styles.selector}>
              <textarea
                rows={10}
                value={problem ? problem : ""}
                disabled={(selectedDate && selectedTime )? false : true}
                onChange={setReasonHandler}
                style={{ borderRadius: "10px", padding: "10px" }}
              ></textarea>
            </FormControl>
          </div>
          <div className="bookApptBottomRight">
          
              
                {doctor?.session && doctor.session.map((session) => {
                    return (
                      <div className="feeInfo">
                      <div className="feeInfoLeft">
                        <img
                          src={ClinicIcon}
                          alt="Clinic Icon"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </div>
                      <div className="feeInfoRight">
                      <div className="feeInfoTop">
                        <p>{session.type} Session</p>
                        <p>Rs. {session.fee} /Session</p>
                      </div>
                      </div>
                      </div>
                    );
                  }
                )}
            <Button
              onClick={bookAppt}
              variant="contained"
              sx={styles.button}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
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
    marginBottom: "5px",
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
