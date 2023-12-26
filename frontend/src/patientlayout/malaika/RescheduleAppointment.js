import Button from "@mui/material/Button";
import "@fontsource/roboto";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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
  const { id } = useParams();

  function setReasonHandler(event) {
    setReason(event.target.value);
  }


 
  const getAppointment = async () => {
    try{
      const formattedStr = `http://localhost:3000/patient/consultations/${id}`;
      const appoinmentList = await axios.get(formattedStr).then((response) => response.data);
      setAppointment(appoinmentList);
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
        reason: reason,
      }))
      .then(response=>response.data);
      if (resched.message==="Success") {
        alert("Appointment Rescheduled Successfully! Please check your email for further details.");
        setAppointment(draft=>{
          draft.date=resched.date;
          draft.time=resched.time;
          draft.updateReason=reason;
          draft.doctorId.appointmentSlots=resched.doctorId.appointmentSlots;
      })
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
  const groupedSlots = groupSlotsByDate(
    appointment?.docOrPatient?.details?.appointmentSlots
  );
  const setDate = (e) => {
    setSelectedDate(e.target.value);
    console.log("e.target.value:", e.target.value);
  };

  const setTime = (e) => {
    setSelectedTime(e.target.value);
  };
  return (
    <div className="rescheduleAppointmentScreen">
      <div className="ScreenBody">
        <div className="halfra">
          {appointment && <div className="appt"><AppointmentCard type="doctor" appt={appointment} /></div>}
          <div className="reasonDiv">
            <h2 style={{ color: "#2854C3" }}>Reason for Rescheduling</h2>
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
        </div>
        <div className="halfra">
          <div className="appointmentDetailsRA">
            <div className="apptResched">
              <h3>Reschedule Date and Time</h3>
              <div className="appointmentHours">
                {appointment?.doctorId?.appointmentSlots &&
                appointment.doctorId.appointmentSlots.length !==
                  0 ? (
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
                        {Object.keys(groupedSlots).map((slot) => (
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
                        {selectedDate &&
                          groupedSlots[selectedDate].map((slot) => 
                            slot.availability===true &&
                            <MenuItem key={slot.time} value={slot.time}>
                              {slot.time}
                            </MenuItem>
                          )}
                      </Select>
                    </FormControl>
                  </div>
                ) : (
                  <p>No Appointment Slots are Available</p>
                )}
              </div>
            </div>
          </div>
          <div className="appointmentBtns">
            <Button
              onClick={rescheduleAppt}
              variant="contained"
              style={{
                background: "#2854c3",
                margin: "10px",
                width: "50%",
                textTransform: "none",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              Reschedule Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

