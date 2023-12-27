import "@fontsource/roboto";
import "./AppointmentSlots.css";
import { React, useState, createContext, useContext, useEffect } from "react";
import axios from "axios";  

import { format } from "date-fns";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";
import {
  Box,
  Card,
  CardContent,
} from "@mui/material";

const groupSlotsByDate = (slotData) => {
  const groupedSlots = {};

  slotData.forEach((slot) => {
    let date = slot.date;
    date = format(new Date(date), "yyyy-MM-dd");
    if (!groupedSlots[date]) {
      groupedSlots[date] = [];
    }
    groupedSlots[date].push(slot);
  });

  return groupedSlots;
};



function findDayFromDate(inputDate) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dateObject = new Date(inputDate);
  const dayIndex = dateObject.getDay();

  return daysOfWeek[dayIndex];
}

const slotContext = createContext({
  slotList: {},
  setSlotList: () => {},
});

const AddSlotDialog = ({ open, setOpen }) => {
  const [timeRangeFields, setTimeRangeFields] = useState([]);
  const [date, setDate] = useState();
  const [timeList, setTimeList] = useState([]);
  const [type, setType] = useState("Online");
  const { slotList, setSlotList } = useContext(slotContext);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const responseObj=await axios.put(`http://localhost:3000/doctor/addSlots`,{slots: timeList})
                      .then(response=>response.data);

    if (responseObj.message === "Success") {
      alert("Slots added successfully!");
      setSlotList((prevSlotList) => {
        const currentDateKey = date.format("YYYY-MM-DD ");
        const updatedSlotList = { ...prevSlotList };
        if (!updatedSlotList[currentDateKey]) {
          updatedSlotList[currentDateKey] = [];
        }
        return {
          ...updatedSlotList,
          [currentDateKey]: [...updatedSlotList[currentDateKey], ...timeList],
        };
      });
    }
    else{
      alert("Slots could not be added!");
    }
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
          if (!timeList.includes(timeStr) && !timeStr.includes("NaN")) {
            const timeObj = {
              time: timeStr,
              availability: true,
              date: format(new Date(date), "yyyy-MM-dd"),
              type: type,
            };
            setTimeList([...timeList, timeObj]);
          }
        }
      }
    }
  };

  const addAnotherSlot = () => {
    if (date) {
      setTimeRangeFields((prevFields) => [
        ...prevFields,
        <SingleInputTimeRangeField
          disablePast
          slotProps={{ textField: { variant: "standard", size: "medium" } }}
          key={prevFields.length}
          label="HH:MM (AM/PM)"
          onChange={handleTimeChange}
          style={{ width: "100%", padding: "0px" }}
        />,
      ]);
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
             <Box sx={styles.box}>
        <Card
          variant="outlined"
          onClick={() => setType("Online")}
          sx={type === "Online" ? styles.card1 : styles.card2}
        >
          <CardContent>Online</CardContent>
        </Card>
        <Card
          variant="outlined"
          onClick={() => setType("Clinic")}
          sx={type === "Clinic" ? styles.card1 : styles.card2}
        >
          <CardContent>Clinic</CardContent>
        </Card>
      </Box>
          <h3 style={{ margin: "5px" }}>Add Time Slots</h3>
          {timeRangeFields.length === 0 && addAnotherSlot()}
          {timeRangeFields &&
            timeRangeFields.map((field, index) => (
              <div key={index} style={{ marginTop: "10px" }}>
                {field}
              </div>
            ))}
        </LocalizationProvider>
      </DialogContent>
      <DialogActions style={{ background: "#f4f9fb" }}>
        <Button onClick={addAnotherSlot} className="actionButton">
          {" "}
          Add Another Slot
        </Button>
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

function AppointmentSlots() {
  const [open, setOpen] = useState(false);
  const [slotList, setSlotList] = useState([]);

  console.log("slotList:", slotList);
  const getSlots=async () =>{
    try{
      const list=await axios.get(`http://localhost:3000/doctor/slots`).then(response=>response.data);
      if (list)
        setSlotList(groupSlotsByDate(list.slots));
      else
        alert("Slots could not be fetched!");
    }
     catch(err){
      console.log(err);
      alert("Slots could not be fetched!");
     }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetch=async ()=>{
      await getSlots();
    }
    fetch();
  },[]);

  return (
    <div className="appointmentDetailsScreen">
      <div className="ScreenBodyAppointment">
        <div className="halfApp">
          <div className="slotList">
            {slotList &&
              Object.keys(slotList).map((date) => {
                return (
                  <slotContext.Provider value={{ slotList, setSlotList }}>
                  <SlotList date={date}/>
                  </slotContext.Provider>
                  )
              })}
          </div>

          <div className="appointmentBtns">
            <Button
              variant="contained"
              style={{
                background: "#2854c3",
                margin: "10px",
                width: "25%",
                padding: "10px",
                textTransform: "none",
                borderRadius: "10px",
              }}
              onClick={handleClickOpen}
            >
              Add Slots
            </Button>
          </div>
          {open ? (
            <slotContext.Provider value={{ slotList, setSlotList }}>
              <AddSlotDialog open={open} setOpen={setOpen} />
            </slotContext.Provider>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const SlotList = ({ date }) => {
  const [open, setOpen] = useState(false);
  const { slotList, setSlotList } = useContext(slotContext);
  function checkDate(date) {
    const today = new Date();
    // const todayDate = format(today, "yyyy-MM-dd");
    if (date >= format(today.setDate(today.getDate() + 1), "yyyy-MM-dd")) {
      return true;
    } else {
      return false;
    }
  }
  const day = findDayFromDate(date);
  return (
    <div className="slotDay">
      <table
        style={{
          width: "100%",
          height: "100%",
          borderCollapse: "collapse",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr>
            <th
              colSpan={4}
              style={{
                background: "#2854C3",
                color: "#ffff",
                padding: "15px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              {date} {day}
            </th>
          </tr>
          <tr
            style={{
              background: "#f9f9f9",
              color: "#2854C3",
              fontWeight: "bold",
            }}
          >
            <td style={{ padding: "10px", textAlign: "left" }}>Slot Timing</td>
            <td style={{ padding: "10px", textAlign: "center" }}>
              Availability
            </td>
            <td style={{ padding: "10px", textAlign: "right" }}>Session</td>
            <td style={{ padding: "10px", textAlign: "right" }}>Actions</td>
          </tr>
        </thead>
        <tbody>
          {slotList && Array.isArray(slotList[date]) &&
            slotList[date].map((slot) => {
              return (
                <tr>
                  <td style={{ padding: "10px" }}>{slot.time}</td>
                  <td style={{ padding: "10px" }}>
                    {slot.availability ? "Available" : "Unavailable"}
                  </td>
                  <td style={{ padding: "10px", textAlign: "right" }}>
                    {slot.type}
                  </td>
                  <td style={{ padding: "10px", textAlign: "right" }}>
                    <Button
                      disabled={!checkDate(date)}
                      onClick={() => setOpen(true)}
                      style={{
                        textTransform: "none",
                        background: !checkDate(date) ? "gray" : "#2854c3",
                        color: "#ffffff",
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  card1: {
    background: "#2854c3",
    color: "white",
    width: "100%",
    margin: "5px",
    borderRadius: "10px",
  },
  card2: {
    background: "white",
    color: "black",
    width: "100%",
    margin: "5px",
    borderRadius: "10px",
  },
  box: {
    width: "90%",
    display: "flex",
    justifyContent: "center",
    margin: "10px",
  }
};


export default AppointmentSlots;
