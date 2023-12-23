import Button from "@mui/material/Button";
import "@fontsource/roboto";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


import { useState } from "react";
import "./CancelAppointment.css";
import UserCard from "../Components/UserCard";

function CancelAppointment() {
    const [reason, setReason]= useState("Something urgent came up");
    function setReasonHandler(event){
        setReason(event.target.value);
    }
  return (
    <div className="cancelAppointmentScreen">
      <div className="ScreenBodyCA">
        <div className="halfCA">
          <UserCard type="patient" width="100%" />
          <div className="reasonDiv">
            <h2 style ={{color: '#2854C3'}}>Reason for Cancelling Appointment</h2>
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
              Cancel Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelAppointment;
