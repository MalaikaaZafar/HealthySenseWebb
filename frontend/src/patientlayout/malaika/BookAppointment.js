import PatientIcon from "@mui/icons-material/PeopleAltOutlined";
import ExperienceIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import "@fontsource/roboto";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./BookAppointment.css";
import UserCard from "../../components/UserCard";

import Button from "@mui/material/Button";
import "@fontsource/roboto";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { format } from "date-fns";

export const BookAppointment = () => {
    const [doctor, setDoctor] = useState(null);
    const [appointment, setAppointment] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [problem, setProblem] = useState(null);
    const [groupedSlots, setGroupedSlots] = useState(null);
    const { id } = useParams();


  const groupSlotsByDate = (slotData) => {
    const groupedSlots = {};
    if (slotData && slotData.length !== 0) {
      slotData.forEach((slot) => {
        let date = slot.date;
        date = format(date, "yyyy-MM-dd");
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
  const setDate = (event) => {};
  const setTime = (event) => {};
  const setReasonHandler = (event) => {};

  const fetchAppointment = async () => {
    try {
      const formattedStr = `http://localhost:3000/patient/doctors/658546f9e3b8a4d7e100aa68`;
      const doctorObj = await axios
        .get(formattedStr)
        .then((response) => response.data);
      if (doctorObj.message==="Success")
      {
        setDoctor(doctorObj.doctor);
        setGroupedSlots(groupSlotsByDate(doctorObj.appointmentSlots));
      }
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

  const reschedAppt = () => {
    Navigate(`/patient/appointments/reschedule/${id}`);
  };

  const cancelAppt = () => {
    Navigate(`/patient/appointments/cancel/${id}`);
  };
  return (
    <div className="bookApptScreen">
      <div className="bookApptScreenBody">
        <div className="left">
           {doctor && <UserCard user={doctor} />}
          <div className="selectSlot">
            <FormControl sx={{ width: "100%", margin: "10px" }}>
              <InputLabel id="date-label">YYYY - MM - DD</InputLabel>
              <Select
                labelId="date-label"
                id="demo-simple-select-filled"
                value={selectedDate}
                onChange={setDate}
                sx={{ width: "100%", margin: "5px" }}
              >
                { groupedSlots && Object.keys(groupedSlots).map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ width: "100%", margin: "10px" }}>
              <InputLabel id="time-label">HH:MM (AM/PM)</InputLabel>
              <Select
                labelId="time-label"
                value={selectedTime}
                onChange={setTime}
                sx={{ width: "100%" }}
              >
                {selectedDate && groupedSlots &&
                  groupedSlots[selectedDate].map(
                    (slot) =>
                      slot.availability === true && (
                        <MenuItem key={slot.time} value={slot.time}>
                          {slot.time}
                        </MenuItem>
                      )
                  )}
              </Select>
            </FormControl>

            <FormControl sx={{ width: "100%", margin: "10px" }}>
                <InputLabel id="problem-label">Problem</InputLabel>
                <textarea
              rows={10}
              disabled={ selectedDate && selectedTime? true : false}
              onChange={setReasonHandler}
              style={{ borderRadius: "10px" }}
            ></textarea>
            </FormControl>
          </div>
        </div>

        <div className="right">
          <div className="docInfo">
            <div className="docInfo1">
              <PatientIcon sx={styles.icon} />
              <p>
                <b>90</b>
              </p>
              <p>Patients</p>
            </div>
            <div className="docInfo1">
              <ExperienceIcon sx={styles.icon} />
              <p>
                <b>{doctor?.experience} Years</b>
              </p>
              <p> Experience</p>
            </div>
            <div className="docInfo1">
              <StarIcon sx={styles.icon} />
              <p>
                <b>4.5</b>
              </p>
              <p>Rating</p>
            </div>
          </div>
          <div className="apptButtons">
            <Button
              onClick={reschedAppt}
              variant="contained"
              className="apptButton"
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
      boxShadow: "10px 0px 10px 0px rgba(0, 0, 0, 0.10)",
      cursor: "pointer",
    },
    borderRadius: "10px",
    padding: "10px 20px",
    width: "70%",
    margin: "5px",
    fontSize: "smaller",
    textTransform: "none",
  },
  icon: {
    fontSize: "30px",
    margin: "5%",
    verticalAlign: "middle",
  },
};


