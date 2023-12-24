import { React, useEffect, useState } from "react";

import "./ViewAllPatients.css";
import UserCard from "../Components/UserCard";

function ViewAllPatients() {
  const [patientList, setPatientList] = useState([]);

  async function fetchUsers() {
    const docList = await fetch(
      `http://localhost:3000/admin/patientList`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json());
    setPatientList(docList);
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
            {patientList && patientList.map((patient) => {
               return <UserCard user={patient}/>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAllPatients;
