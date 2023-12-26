import { React, useEffect, useState } from "react";
import "./ViewAllPatients.css";
import DoctorCard from "../components/DoctorCard";
import axios from "axios";

function ViewAlldoctors() {
  const [doctorList, setDoctorList] = useState([]);

  async function fetchUsers() {
    const docList = await axios.get("http://localhost:3000/admin/doctorList")
      .then(response => response.data);
    console.log(docList)
    return docList;
  }


  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
      console.log(doctorList)
    };
    fetchData();
    console.log(doctorList.length)
  }, []);

  return (
    <div className="userListScreen">
      <div className="screenBodyUserList">
        <div className="halfUserScreen">
          <div className="userList">
            {doctorList?.length > 0 && doctorList.map((doctor) => {
              return <div className="docCard"><DoctorCard user={doctor} /></div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAlldoctors;
