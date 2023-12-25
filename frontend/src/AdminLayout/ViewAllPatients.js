import { React, useEffect, useState } from "react";
import axios from "axios";

import "./ViewAllPatients.css";
import UserCard from "../Components/UserCard";

function ViewAllPatients() {
  const [patientList, setPatientList] = useState([]);

  async function fetchUsers() {
    const patients = await axios
      .get("http://localhost:3000/admin/patientList")
      .then((response) => response.data);
    setPatientList(patients);
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
            {patientList &&
              patientList.map((patient) => {
                return (
                  <div className="userCard">
                    <UserCard user={patient} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAllPatients;
