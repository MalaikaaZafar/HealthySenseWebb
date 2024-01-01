
import "@fontsource/roboto";
import "./AppointmentDetail.css";

import UserCard from "../../components/UserCard";
import DetailComponent from "./DetailComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DoctorSidePanel from "../../components/doctorSidePanel";

function AppointmentDetail() {
  const [appointment, setAppointment] = useState(null);
  const { id } = useParams();

  const getAppointment = async () => {
    try {
      const formattedStr = `/doctor/consultations/${id}`;
      const appoinmentList = await fetch(formattedStr, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
      if (appoinmentList.message === "Success") {
        setAppointment(appoinmentList.appt);
        console.log(appoinmentList);
      } else {
        console.log(appoinmentList.message);
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
      alert("Something went wrong");
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      await getAppointment();
    };
    fetchData();
  }, []);

  return (
    <div className="appointmentDetailsScreenDoc">
      <div className="sidePanel">
        <DoctorSidePanel appt={appointment}/></div>
      
      <div className="ScreenBodyADoc">
        <div className="halfADoc">
          {appointment && (
            <>
              <UserCard user={appointment} />
              <DetailComponent appt={appointment} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}


export default AppointmentDetail;
