import PatientIcon from '@mui/icons-material/PeopleAltOutlined';
import ExperienceIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import StarIcon from '@mui/icons-material/StarBorderOutlined';
import Button from '@mui/material/Button';
import "@fontsource/roboto";

import { format } from "date-fns"
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './AppointmentDetail.css';
import DetailComponent from './DetailComponent';
import AppointmentCard from '../../components/AppointmentCard';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import api from '../../services/api';

export const AppointmentDetail = () => {
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams();

  const Navigate = useNavigate();
  console.log(appointment);
  const date = appointment?.date;
  const fetchAppointment = async () => {
    try {
      const formattedStr = `/patient/consultations/${id}`;
      const appoinmentList = await api.get(formattedStr).then((response) => response.data);
      if (appoinmentList)
        setAppointment(appoinmentList);

    }
    catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchAppointment();
    };
    fetchData();
  }, []);

  const reschedAppt = () => {
    Navigate(`/patient/appointments/reschedule/${id}`);
  }

  const cancelAppt = () => {
    Navigate(`/patient/appointments/cancel/${id}`);
  }
  return (
    <div className="viewApptScreen">
      <div className="viewApptScreenBody">
        <div className="viewApptTop">
          {appointment && (
            <div className="viewApptTopLeft">
              <AppointmentCard type="doctor" appt={appointment} />
            </div>
          )}
          <div className="viewApptTopRight">
            <div className="viewApptRight">
              <PatientIcon sx={styles.icon} />
              <p>
                <b>90</b>
              </p>
              <p>Patients</p>
            </div>
            <div className="viewApptRight">
              <ExperienceIcon sx={styles.icon} />
              <p>
                <b>{appointment?.doctorId?.experience} Years</b>
              </p>
              <p> Experience</p>
            </div>
            <div className="viewApptRight">
              <StarIcon sx={styles.icon} />
              <p>
                <b>4.5</b>
              </p>
              <p>Rating</p>
            </div>
          </div>
        </div>
        <div className="viewApptBottom">
          <div className="viewAppt">
            <div className="viewApptDetails">
              {appointment && <div className="viewApptDetailsLeft"><DetailComponent appt={appointment} /></div>}
            </div>
            {appointment && !appointment.status === "Completed" && !appointment.status === "Cancelled" &&
              <div className="viewApptBottomRight">
                <Button sx={styles.button} onClick={reschedAppt}>
                  Reschedule Appointment
                </Button>
                <Button sx={styles.button} onClick={cancelAppt}>
                  Cancel Appointment
                </Button>
              </div>
            }
            {appointment && appointment.status === "Completed" &&
              <div className="viewApptBottomRight">
                <Button sx={styles.button} onClick={reschedAppt}>
                  View Diagnosis
                </Button>
                <Button sx={styles.button} onClick={cancelAppt}>
                  View Report
                </Button>
              </div>
            }
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
