import "@fontsource/roboto";
import { React, useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

import { format } from "date-fns";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Container, Box, Button, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SingleInputTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputTimeRangeField";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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
  const { slotList, setSlotList } = useContext(slotContext);
  const { addSlotOpen, setAddSlotOpen } = useContext(addContext);
  const {openErrAdd, setOpenErrAdd} = useContext(errAddContext);
  const [type, setType] = useState("Online");
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (timeList.length !== 0) {
    const responseObj = await axios
      .put(`http://localhost:3000/doctor/addSlots`, { slots: timeList })
      .then((response) => response.data);

    if (responseObj.message === "Success") {
      setAddSlotOpen(true);
      setSlotList((prevSlotList) => {
        const currentDateKey = format(new Date(date), "yyyy-MM-dd");
        const updatedSlotList = { ...prevSlotList };
        if (!updatedSlotList[currentDateKey]) {
          updatedSlotList[currentDateKey] = [];
        }
        return {
          ...updatedSlotList,
          [currentDateKey]: [...updatedSlotList[currentDateKey], ...timeList],
        };
      });
    } else {
      alert("Slots could not be added!");
    }
    handleClose();
  }
  else {
    setOpenErrAdd(true)
  }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (newTime) => {
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
              type: type,
              date: format(new Date(date), "yyyy-MM-dd"),
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
          <div className="typeSetter">
            <FormControl
              sx={{ width: "100%", margin: "5px", marginBottom: "0px" }}
            >
              <Card
                onClick={() => {
                  setType("Online");
                }}
                sx={type && type === "Online" ? styles.card1 : styles.card2}
              >
                <CardContent>Online Session</CardContent>
              </Card>
            </FormControl>
            <FormControl sx={{ width: "100%", margin: "5px" }}>
              <Card
                onClick={() => {
                  setType("Clinic");
                }}
                sx={type && type === "Clinic" ? styles.card1 : styles.card2}
              >
                <CardContent>Clinic Session</CardContent>
              </Card>
            </FormControl>
          </div>
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
};

const delContext = createContext();
const addContext = createContext();
const errAddContext = createContext();

function AppointmentSlots() {
  const [open, setOpen] = useState(false);
  const [slotList, setSlotList] = useState(null);
  const [groupedSlots, setGroupedSlots] = useState(null);
  const [openDel, setOpenDel] = useState(false);
  const [addSlotOpen, setAddSlotOpen] = useState(false);
  const [openErrAdd, setOpenErrAdd] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseDel = () => {
    setOpenDel(false);
  };

  const handleCloseAdd = () => {
    setAddSlotOpen(false);
    setOpenErrAdd(false);
  }

  
  const getSlots = async () => {
    try {
      const responseObj = await axios.get(`http://localhost:3000/doctor/slots`);
      if (responseObj.data.message === "Success") {
        setSlotList(groupSlotsByDate(responseObj.data.slots));
      } else {
        alert("Slots could not be fetched!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchFunc = async () => {
      getSlots();
    };
    fetchFunc();
  }, []);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            mt: 3,
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          {slotList &&
            Object.keys(slotList).map((date) => {
              return (
                <slotContext.Provider value={{ slotList, setSlotList }}>
                  <delContext.Provider value={{ openDel, setOpenDel }}>
                    <SlotList date={date} slotListByDate={slotList[date]} />
                  </delContext.Provider>
                </slotContext.Provider>
              );
            })}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              background: "#2854c3",
              m: 1,
              width: "100%",
              p: 1,
              textTransform: "none",
              borderRadius: 1,
            }}
            onClick={handleClickOpen}
          >
            Add Slots
          </Button>
        </Box>
        {open ? (
          <slotContext.Provider value={{ slotList, setSlotList }}>
            <addContext.Provider value={{ addSlotOpen, setAddSlotOpen }}>
              <errAddContext.Provider value={{ openErrAdd, setOpenErrAdd }}>
              <AddSlotDialog open={open} setOpen={setOpen} />
              </errAddContext.Provider>
            </addContext.Provider>
          </slotContext.Provider>
        ) : null}
      </Box>
      <Snackbar open={openDel} autoHideDuration={500} onClose={handleCloseDel}>
        <MuiAlert elevation={6} variant="filled">
          The slot has been deleted successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={addSlotOpen}
        autoHideDuration={500}
        onClose={handleCloseAdd}
      >
        <MuiAlert elevation={6} variant="filled">
          The slot has been added successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar open={openErrAdd} autoHideDuration={500} onClose={handleCloseAdd}>
        <MuiAlert severity="error" elevation={6} variant="filled">
          Please select a date and time to add a slot!
        </MuiAlert>
      </Snackbar>

    </Container>
  );
}

const SlotList = ({ date, slotListByDate }) => {
  const [open, setOpen] = useState(false);
  const { slotList, setSlotList } = useContext(slotContext);
  const { openDel, setOpenDel } = useContext(delContext);
  function checkDate(date) {
    const today = new Date();
    if (date >= format(today.setDate(today.getDate() + 1), "yyyy-MM-dd")) {
      return true;
    } else {
      return false;
    }
  }

  const deleteSlot = async (time, type) => {
    try {
      const responseObj = await axios
        .put(`http://localhost:3000/doctor/deleteSlot`, {
          date: date,
          time: time,
          type: type,
        })
        .then((response) => response.data);
      if (responseObj.message === "Success") {
        setOpenDel(true);
        setSlotList(groupSlotsByDate(responseObj.slots));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const day = findDayFromDate(date);
  return (
    <Box sx={{ m: 1, mt: 3 }}>
      <Table
        sx={{ minWidth: 300, maxWidth: 500, height: "100%", borderRadius: 10 }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={3}
              sx={{
                background: "#2854C3",
                color: "#ffff",
                padding: 2,
                width: "33%",
              }}
            >
              <Typography variant="h6">
                {date} {day}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow
            sx={{ background: "#f9f9f9", color: "#2854C3", fontWeight: "bold" }}
          >
            <TableCell sx={{ padding: "5px", textAlign: "left", width: "33%" }}>
              Slot Timing
            </TableCell>
            <TableCell
              sx={{ padding: "5px", textAlign: "center", width: "33%" }}
            >
              Availability
            </TableCell>
            <TableCell
              sx={{ padding: "5px", textAlign: "right", width: "33%" }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slotListByDate &&
            slotListByDate.map((slot) => {
              return (
                <TableRow key={slot.time}>
                  <TableCell
                    sx={{ padding: "5px", textAlign: "left", width: "33%" }}
                  >
                    {slot.time}
                  </TableCell>
                  <TableCell
                    sx={{ padding: "5px", textAlign: "center", width: "33%" }}
                  >
                    {slot.availability ? "Available" : "Unavailable"}
                  </TableCell>
                  <TableCell
                    sx={{ padding: "5px", textAlign: "right", width: "33%" }}
                  >
                    <Button
                      disabled={!checkDate(date)}
                      onClick={() => deleteSlot(slot.time, slot.type)}
                      sx={{
                        textTransform: "none",
                        background: !checkDate(date) ? "gray" : "#2854c3",
                        color: "#ffffff",
                      }}
                    >
                      Delete Slot
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Box>
  );
};

const styles = {
  card1: {
    width: "90%",
    marginBottom: "0px",
    background: "#2854c3",
    color: "white",
    borderRadius: "10px",
    padding: "10px",
  },
  card2: {
    width: "90%",
    margin: "5px",
    background: "#f7f7f7",
    color: "black",
    borderRadius: "10px",
    padding: "10px",
  },
};

export default AppointmentSlots;
