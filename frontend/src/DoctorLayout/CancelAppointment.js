import Button from "@mui/material/Button";
import "@fontsource/roboto";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CancelAppointment.css";
import UserCard from "../Components/UserCard";
import AppointmentCard from "../Components/AppointmentCard";

const CancelAppointment = () => {
    const [reason, setReason]= useState("Something urgent came up");
    const [appointment, setAppointment] = useState(null);
    const {id}= useParams();
    const fetchAppointment=async ()=>{
      const formattedStr = `http://localhost:3000/doctor/consultations/${id}`;
      const appoinmentList = await fetch(formattedStr, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
      setAppointment(appoinmentList);
    }

    const cancelAppointment=async ()=>{
      const formattedStr = `http://localhost:3000/doctor/consultations/cancel`;
      const appoinmentList = await fetch(formattedStr, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: id, reason: reason})
      }).then((response) => response.json());
      if (appoinmentList.message==="Something went wrong")
      {
        alert("Something went wrong");
      }
      else 
      {
        alert("Appointment Cancelled");
      }
    }

    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchAppointment();
        if (data) {
          setAppointment(data);
        }
      };
      fetchData();
    }, []);

    function setReasonHandler(event){
        setReason(event.target.value);
    }

  return (
    <div className="cancelAppointmentScreen">
      <div className="ScreenBodyCA">
        <div className="halfCA">
          {
            appointment && 
            <div className="user">
              <AppointmentCard appt={appointment} />
            </div>
          }
          
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
              onClick={cancelAppointment}
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
