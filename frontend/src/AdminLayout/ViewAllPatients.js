import { React, useEffect, useState } from "react";
import axios from "axios";
import "./ViewAllPatients.css";
import PatientCard from "../components/PatientCard";
import { Box } from "@mui/system";

function ViewAllPatients() {
  const [patientList, setPatientList] = useState([]);

  async function fetchUsers() {
    const patients = await axios
      .get("http://localhost:3000/admin/patientList")
      .then((response) => response.data);
    console.log(patients);
    setPatientList(patients);
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
    };
    fetchData();
  }, []);

  return (

    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', p: 2, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
      {patientList?.length > 0 && patientList.map((pat) => {
        return (
          <PatientCard user={pat} />
        );
      })}
    </Box>
  );
}

export default ViewAllPatients;
