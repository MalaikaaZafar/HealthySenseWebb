import Button from "@mui/material/Button";
import "@fontsource/roboto";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import TimeIcon from '@mui/icons-material/AccessTime';


import { useState } from "react";
import "./RescheduleAppointment.css";
import UserCard from "../Components/UserCard";

function RescheduleAppointment() {
    const [reason, setReason]= useState("Something urgent came up");
    function setReasonHandler(event){
        setReason(event.target.value);
    }
  return (
    <div className="rescheduleAppointmentScreen">
      <div className="ScreenBody">
        <div className="halfra">
          <UserCard type="patient" width="100%" />
          <div className="reasonDiv">
            <h2 style ={{color: '#2854C3'}}>Reason for Rescheduling</h2>
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
            <textarea rows={10} disabled={reason === "other" ? false : true} onChange={setReasonHandler} style={{borderRadius: '10px'}}></textarea>
          </div>
    
        </div>
        <div className="halfra">
        <div className="appointmentDetailsRA">
          <div className="appointmentCalendar">
          <h3 style ={{color: '#2854C3'}}>Reschedule Date and Time</h3>
            <div className="appointmentHours">
              <div className="appointmentHour"><WbSunnyOutlinedIcon style={{paddingRight: '5px'}}/>Morning</div>
              <div className="appointmentHour"><NightsStayOutlinedIcon style={{paddingRight: '5px'}}/> Evening</div>
            </div>
            <div className="appointmentHours">
              <div className="appointmentHour"><TimeIcon style={{paddingRight: '5px'}}/>11:30 am - 12:30 am</div>
              <div className="appointmentHour"><TimeIcon style={{paddingRight: '5px'}}/>10:45 am - 11:45 am</div>
              <div className="appointmentHour"><TimeIcon style={{paddingRight: '5px'}}/>10:00 am - 11:00 am</div>
            </div>
          </div>
        </div>
        <div className="appointmentBtns">
            <Button
              variant="contained"
              style={{
                background: "#2854c3",
                margin: "10px",
                width: "50%",
                textTransform: "none",
                borderRadius: "10px",
                padding: '10px'
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

export default RescheduleAppointment;
