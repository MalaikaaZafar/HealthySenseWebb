import Button from "@mui/material/Button";
import "@fontsource/roboto";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { format } from "date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";

import { useImmer } from "use-immer";
import { useState, useEffect, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./RescheduleAppointment.css";
import  AppointmentCard from "../Components/AppointmentCard";

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

function RescheduleAppointment() {
  const [reason, setReason] = useState("Something urgent came up");
  const [appointment, setAppointment] = useImmer(null);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  function setReasonHandler(event) {
    setReason(event.target.value);
  }

  const addSlot = () => {
    setOpen(true);
  };

  const { id } = useParams();
  const getAppointment = async () => {
    const formattedStr = `http://localhost:3000/doctor/consultations/${id}`;
    const appoinmentList = await axios.get(formattedStr).then((response) => response.data);
    setAppointment(appoinmentList);
  };

  const rescheduleAppt = async () => {
   try{ 
      const reqBody= JSON.stringify({
        id: id,
        date: selectedDate,
        time: selectedTime,
        reason: reason,
      });
      const resched=await axios.post("http://localhost:3000/doctor/consultations/reschedule", reqBody).then(response=>response.data);
      if (resched.message==="Success") {
        alert("Appointment Rescheduled Successfully! Please check your email for further details.");
        setAppointment(draft=>{
          draft.consult=resched.appointment;
      })
      setAppointment(draft=>{
        draft.docOrPatient.details.appointmentSlots=resched.docOrPatient.appointmentSlots;
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
          {appointment && <div className="appt"><AppointmentCard type="patient" appt={appointment} /></div>}
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
                {appointment?.docOrPatient?.details?.appointmentSlots &&
                appointment.docOrPatient.details.appointmentSlots.length !==
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
              <Button
                variant="contained"
                onClick={addSlot}
                className="addSlotBtn"
                sx={{background: "#2854c3"}}
              >
                Add Slot
              </Button>
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
      {open && (
        <apptContext.Provider value={{ appointment, setAppointment }}>
          <AddSlotDialog open={open} setOpen={setOpen} />
        </apptContext.Provider>
      )}
    </div>
  );
}

function AddSlotDialog({ open, setOpen }) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const { appointment, setAppointment } = useContext(apptContext);

  const handleClose = () => {
    setOpen(false);
    setAppointment((draft) => {
      if (time && time.date && time.time && time.availability)
        draft.docOrPatient.details.appointmentSlots.push({
          date: time.date,
          time: time.time,
          availability: time.availability,
        });
    });
  };

  const handleSave = () => {
    handleClose();
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    console.log("newTime:", newTime);

    if (newTime) {
      if (
        Array.isArray(newTime) &&
        newTime.length === 2 &&
        newTime[0] &&
        newTime[1]
      ) {
        const startTime = newTime[0].toDate();
        const endTime = newTime[1].toDate();
        if (startTime && endTime && startTime < endTime) {
          const startTimeStr =
            (startTime.getHours() % 12) +
            ":" +
            startTime.getMinutes() +
            " " +
            (startTime.getHours() >= 12 ? "PM" : "AM");
          const endTimeStr =
            (endTime.getHours() % 12) +
            ":" +
            endTime.getMinutes() +
            " " +
            (endTime.getHours() >= 12 ? "PM" : "AM");
          const timeStr = startTimeStr + " - " + endTimeStr;
          if (!timeStr.includes("NaN")) {
            console.log("timeStr:", date);
            const timeObj = {
              time: timeStr,
              availability: true,
              date: format(new Date(date), "yyyy-MM-dd"),
            };
            setTime(timeObj);
          }
        }
      }
    }
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      classes={{ paper: "MuiDialog-paper" }}
    >
      <DialogTitle
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          background: "#f4f9fb",
        }}
      >
        Add Slots
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "center",
          background: "#f4f9fb",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <h3 style={{ margin: "5px" }}>Select Date</h3>
          <DatePicker
            format="YYYY - MM - DD "
            disablePast
            slotProps={{ textField: { variant: "filled" } }}
            label="MM/DD/YYYY"
            style={{ margin: "5px" }}
            onChange={handleDateChange}
            dateAdapter={AdapterDayjs}
          />
          <h3 style={{ margin: "5px" }}>Add Time Slots</h3>
          <SingleInputTimeRangeField
            disablePast
            slotProps={{ textField: { variant: "standard", size: "medium" } }}
            label="HH:MM (AM/PM)"
            onChange={handleTimeChange}
            style={{ width: "100%", padding: "0px" }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions style={{ background: "#f4f9fb" }}>
        <Button onClick={handleClose} className="actionButton">
          Cancel
        </Button>
        <Button onClick={handleSave} className="actionButton">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default RescheduleAppointment;
