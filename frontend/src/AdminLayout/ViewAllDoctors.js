import { React, useEffect, useState } from "react";
import "./ViewAllPatients.css";
import DoctorCard from "../Components/DoctorCard";
import UserCard from "../Components/UserCard";

function ViewAlldoctors() {
  const [doctorList, setDoctorList] = useState([]);

  async function fetchUsers() {
    const docList = await fetch(
      `http://localhost:3000/admin/doctorList`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json());
    setDoctorList(docList);
  }


  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
    };
    fetchData();
  }, []);

  return (
    <div className="userListScreen">
      <div className="screenBodyUserList">
        <div className="halfUserScreen">
          <div className="userList">
            {doctorList && doctorList.map((doctor) => {
                return <DoctorCard user={doctor} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAlldoctors;
