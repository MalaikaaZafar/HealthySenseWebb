import React, { useState, useEffect, useContext, createContext } from 'react';
import { useImmer } from 'use-immer';
import LoadingAnimation from '../../components/loader/LoadingAnimation';
import { Button } from '@mui/material';
import PatientDetails from './PatientDetails';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CreateDiagnosis from './CreateDiagnosis';
import FinalReport from './FinalReport';

const DiagnosisContext = createContext();

export function useDiagnosis() {
    return useContext(DiagnosisContext);
}

const DiagnosisPage = () => {
    //const { appointmentID } = useParams();
    const appointmentID = "658bd21cd54145942c66e9be";
    const [CurrentPage, setCurrentPage] = useState(0);
    const [AppointmentData, setAppointmentData] = useImmer({});
    const [Diagnosis, setDiagnosis] = useImmer({
        diagnosis: "",
        prescription: [],
        tests: [],
        notes: "",
        type: "",
        fee: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    const PageChange = (page) => {
        setIsLoading(false);
        setCurrentPage(page);
    }
    const FetchDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/doctor/appointments/${appointmentID}`);
            const data = response.data;
            console.log(data.AppointmentDetail);
            setAppointmentData(data.AppointmentDetail);
            setAppointmentData(
                draft => {
                    draft.date = data.AppointmentDetail.date.slice(0, 10);
                    draft.patientId.user.dob = data.AppointmentDetail.patientId.user.dob.slice(0, 10);
                }
            )
            setCurrentPage(1);
            setIsLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        FetchDetails();
    }, []);


    return (
        <DiagnosisContext.Provider value={{ AppointmentData, Diagnosis, setDiagnosis, PageChange }}>
            <LoadingAnimation isVisible={isLoading} />
            {CurrentPage === 1 ? <PatientDetails /> : null}
            {CurrentPage === 2 ? <CreateDiagnosis /> : null}
            {CurrentPage === 3 ? <FinalReport /> : null}
        </DiagnosisContext.Provider>
    )
}

export default DiagnosisPage;