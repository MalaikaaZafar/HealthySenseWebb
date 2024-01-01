import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PatientCard from "../components/PatientCard";
import "./ViewAllPatients.css";
import api from "../services/api";

function ViewAllPatients() {
  const [patientList, setPatientList] = useState([]);

  async function fetchUsers() {
    const patients = await api
      .get("/admin/patientList")
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
      {patientList?.length > 0 && patientList.map((pat, index) => {
        return (
          <PatientCard user={pat} key={index} />
        );
      })}
    </Box>
  );
}

const styles = {
  screen: {
    padding: "16px",
  },
  halfScreen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  userList: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "center",
    width: "100%",
  },
  userCard: {
    width: { xs: "100%", md: "45%" },
    marginLeft: { xs: "0%", md: "1%" },
    marginRight: { xs: "0%", md: "1%" },
    marginBottom: "2%",

  },
};

export default ViewAllPatients;
