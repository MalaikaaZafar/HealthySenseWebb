import React, { useState, useEffect, useContext, createContext } from 'react';
import { useImmer } from 'use-immer';
import LoadingAnimation from '../../Components/LoadingAnimation';
import { Button } from '@mui/material';
import PatientDetails from './PatientDetails';
import CreateDiagnosis from './CreateDiagnosis';
import FinalReport from './FinalReport';

const DiagnosisContext = createContext();

export function useDiagnosis() {
    return useContext(DiagnosisContext);
}

const DiagnosisPage = ({ patientID, appointmentID }) => {
    const [CurrentPage, setCurrentPage] = useState(1);
    const [PatientData, setPatientData] = useImmer({
        name: "John Doe",
        Age: 20,
        Address: "123, ABC Street, XYZ City",
        Phone: 1234567890,
        Email: "JohnDoe@email",
        History: [
            {
                Type: "Diabetes",
                Description: "Since 2010",
            }
        ]
    });
    const [AppointmentData, setAppointmentData] = useImmer({
        Date: "12/12/2021",
        Time: "12:00 PM",
    });
    const [DoctorData, setDoctorData] = useImmer({
        name: "Dr. John Doe",
        Specialization: "General Physician",
        Qualifications: "MBBS, MD",
        Experience: "10 Years",
        Address: "123, ABC Street, XYZ City",
        Phone: 1234567890,
        Email: "JohnDoe@Email",
        Notes: "Lorem Ipsum"
    });
    const [Diagnosis, setDiagnosis] = useImmer({
        diagnosis: "",
        prescription: [],
        tests: [],
        notes: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const PageChange = (page) => {
        setIsLoading(false);
        setCurrentPage(page);
    }

    useEffect(() => {
        //Fetching Data from backend
    }, []);


    return (
        <DiagnosisContext.Provider value={{ PatientData, DoctorData, AppointmentData, Diagnosis, setDiagnosis, PageChange }}>
            {isLoading ? <LoadingAnimation /> : null}
            {CurrentPage === 1 ? <PatientDetails /> : null}
            {CurrentPage === 2 ? <CreateDiagnosis /> : null}
            {CurrentPage === 3 ? <FinalReport /> : null}
            <Button onClick={() => PageChange(1)}>Next</Button>
        </DiagnosisContext.Provider>
    )
}

export default DiagnosisPage;