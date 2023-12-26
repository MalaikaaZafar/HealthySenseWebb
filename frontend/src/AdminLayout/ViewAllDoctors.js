import { React, useEffect, useState } from "react";
import "./ViewAllPatients.css";
import DoctorCard from "../components/DoctorCard";
import axios from "axios";

import Box from '@mui/material/Box';

function ViewAlldoctors() {
  const [doctorList, setDoctorList] = useState([]);

  async function fetchUsers() {
    const docList = await axios.get("http://localhost:3000/admin/doctorList")
      .then(response => response.data);
    setDoctorList(docList)
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
    <Box className="userListScreen">
      <Box className="screenBodyUserList">
        <Box className="halfUserScreen">
          <Box className="userList">
            {doctorList?.length > 0 && doctorList.map((doctor) => {
              return <Box className="docCard"><DoctorCard user={doctor} /></Box>;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}



export default ViewAlldoctors;
