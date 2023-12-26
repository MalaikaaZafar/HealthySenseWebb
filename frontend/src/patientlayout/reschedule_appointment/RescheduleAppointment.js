import PatientIcon from "@mui/icons-material/PeopleAltOutlined";
import ExperienceIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import StarIcon from "@mui/icons-material/StarBorderOutlined";
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined";
import TimeIcon from "@mui/icons-material/AccessTime";
import "@fontsource/roboto";

import Button from "@mui/material/Button";
import "@fontsource/roboto";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card"
import { CardContent } from "@mui/material";

import { format } from "date-fns";

import { useImmer } from "use-immer";
import { useState, useEffect, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./RescheduleAppointment.css";
import  AppointmentCard from "../../components/AppointmentCard";

const apptContext = createContext();

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

export const RescheduleAppointment = () => {
  const [reason, setReason] = useState("Something urgent came up");
  const [appointment, setAppointment] = useImmer(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [groupedSlots, setGroupedSlots] = useState(null);
  const [type, setType] = useState("Online");
  const { id } = useParams();

  function setReasonHandler(event) {
    setReason(event.target.value);
  }


 
  const getAppointment = async () => {
    try{
      const formattedStr = `http://localhost:3000/patient/consultations/${id}`;
      const appoinmentList = await axios.get(formattedStr).then((response) => response.data);
      setAppointment(appoinmentList);
      setGroupedSlots(groupSlotsByDate(appoinmentList.doctorId.appointmentSlots));
    }
    catch(err)
    {
      alert(err);
    }
    
  };

  const rescheduleAppt = async () => {
   try{ 
      const resched=await axios.post("http://localhost:3000/patient/consultations/reschedule", ({
        id: id,
        date: selectedDate,
        time: selectedTime,
        type: type,
        reason: reason,
      }))
      .then(response=>response.data);
      if (resched.message==="Success") {
        alert("Appointment Rescheduled Successfully! Please check your email for further details.");
        setAppointment(draft=>{
          draft.date=resched.appointment.date;
          draft.time=resched.appointment.time;
          draft.updateReason=reason;
          draft.doctorId.appointmentSlots=resched.appointment.doctorId.appointmentSlots;
          draft.type=resched.appointment.type;
      })
      setGroupedSlots(groupSlotsByDate(resched.appointment.doctorId.appointmentSlots));  
    } 
    else {
      alert("Something went wrong");
    }}
    catch(err)
    {
      alert(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAppointment();
    };
    fetchData();
  }, []);


  const setDate = (e) => {
    setSelectedDate(e.target.value);
    console.log("e.target.value:", e.target.value);
  };

  const setTime = (e) => {
    setSelectedTime(e.target.value);
  };

  const setOnline = () => {
    setType("Online");
  }

  const setClinic = () => {
    setType("Clinic");
  }


  return (
  <div className="reschedApptScreen">
      <div className="reschedApptScreenBody">
        <div className="reschedApptTop">
          {appointment && (
            <div className="reschedApptTopLeft">
              <AppointmentCard type="doctor" appt={appointment} />
            </div>
          )}
          <div className="reschedApptTopRight">
            <div className="reschedApptRight">
              <PatientIcon sx={styles.icon} />
              <p>
                <b>90</b>
              </p>
              <p>Patients</p>
            </div>
            <div className="reschedApptRight">
              <ExperienceIcon sx={styles.icon} />
              <p>
                <b>{appointment?.doctorId?.experience} Years</b>
              </p>
              <p> Experience</p>
            </div>
            <div className="reschedApptRight">
              <StarIcon sx={styles.icon} />
              <p>
                <b>4.5</b>
              </p>
              <p>Rating</p>
            </div>
          </div>
        </div>
        <div className="reschedApptBottom">
          <div className="reschedAppt">
            <div className="reschedApptBottomLeft">
             <h2 style={{ color: "#2854C3", margin:'0px' }}>Reason for Rescheduling</h2>
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
             <textarea
               rows={10}
               disabled={reason === "other" ? false : true}
               onChange={setReasonHandler}
               style={{ borderRadius: "10px" }}
             ></textarea>
          </div>
          <div className="reschedApptBottomRight">
          <div className="bookApptSlotSelector">
          <h2 style={{ color: "#2854C3" }}>Select a New Slot</h2>
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
                value={reason ? reason : ""}
                disabled={(selectedDate && selectedTime )? false : true}
                onChange={setReasonHandler}
                style={{ borderRadius: "10px" }}
              ></textarea>
            </FormControl>
          </div>
            <Button sx={styles.button} onClick={rescheduleAppt}>
              Reschedule Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}


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


