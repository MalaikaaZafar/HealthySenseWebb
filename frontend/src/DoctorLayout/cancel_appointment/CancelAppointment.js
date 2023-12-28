import Button from "@mui/material/Button";
import "@fontsource/roboto";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {useImmer} from 'use-immer';

import "./CancelAppointment.css";
import AppointmentCard from "../../components/AppointmentCard";
import DoctorSidePanel from "../../components/doctorSidePanel";

const CancelAppointment = () => {
    const [reason, setReason]= useState("Something urgent came up");
    const [appointment, setAppointment] = useImmer(null);
    const {id}= useParams();
    const fetchAppointment=async ()=>{
      const formattedStr = `http://localhost:3000/doctor/consultations/${id}`;
      const appoinmentList = await axios.get(formattedStr).then((response) => response.data);
      if (appoinmentList.message==="Success")
      {
        return appoinmentList.appt;
      }
      else 
      {
        alert("Something went wrong"); 
      }
    }

    const cancelAppointment=async ()=>{
      const formattedStr = `http://localhost:3000/doctor/consultations/cancel`;
      const appoinmentList = await axios.put(formattedStr,{id: id, reason: reason}).then((response) => response.data);
      if (appoinmentList.message==="Success")
      {
        alert("Appointment Cancelled");
        setAppointment(draft=>{
          draft.status="Cancelled";
          draft.updateReason=reason;
        })
      }
      else 
      {
        alert("Something went wrong"); 
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
    <div className="cancelAppointmentScreenDoc">
      <div className="sidePanel">
      <DoctorSidePanel appt={appointment}/>
      </div>
      <div className="ScreenBodyCADoc">
        <div className="halfCADoc">
          {
            appointment && 
            <div className="userDoc">
              <AppointmentCard appt={appointment} />
            </div>
          }
          
          <div className="reasonDivDoc">
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
          <div className="appointmentBtnsDoc">
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
