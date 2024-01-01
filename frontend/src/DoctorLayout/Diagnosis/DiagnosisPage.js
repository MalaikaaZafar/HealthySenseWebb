import React, { useState, useEffect, useContext, createContext } from 'react';
import { useImmer } from 'use-immer';
import LoadingAnimation from '../../components/loader/LoadingAnimation';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CreateDiagnosis from './CreateDiagnosis';
import FinalReport from './FinalReport';
import getAppointmentData from '../../services/doctor/diagnosis/getAppointmentData';
import DoctorSidePanel from './doctorSidePanel';
import { set } from 'date-fns';

const DiagnosisContext = createContext();

export function useDiagnosis() {
    return useContext(DiagnosisContext);
}

const DiagnosisPage = () => {
    //const { appointmentID } = useParams();
    const navigate =useNavigate();
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
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    const PageChange = (page) => {
        setIsLoading(false);
        setCurrentPage(page);
    }
    const FetchDetails = async () => {
        const data =await getAppointmentData(appointmentID);
        if(data===null)
        {
            setOpen(true);
            setMsg("Something Went Wrong");
            return;
        }
        else if(data){
            if(data.message){
                setOpen(true);
                setMsg("Diagnosis Already Exists");
                setTimeout(() => {
                    navigate(`/login`);
                }, 2000);
                return;
            }
            else{
                setAppointmentData(data);
                setIsLoading(false);
                setCurrentPage(1);
            }
        }
    }
    useEffect(() => {
        FetchDetails();
    }, []);


    return (
        <>
            <LoadingAnimation isVisible={isLoading} />
            {
                !isLoading &&
                    <DiagnosisContext.Provider value={{ AppointmentData, Diagnosis, setDiagnosis, PageChange }}>
                        {CurrentPage === 1 ? <CreateDiagnosis /> : null}
                        {CurrentPage === 2 ? <FinalReport /> : null}
                    </DiagnosisContext.Provider>
            }
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>

    )
}

export default DiagnosisPage;