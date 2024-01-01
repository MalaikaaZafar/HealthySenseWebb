import React from "react";
import MyDocument from "./ReportTemplate";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useImmer } from "use-immer";
import { Button } from "@mui/material";

const DownloadReport = ({AppointmentData}) => {
    const [Diagnosis, setDiagnosis] = useImmer({
        PaitentName: AppointmentData.PatientName,
        PatientPhone: AppointmentData.PatientPhoneNumber,
        PatientEmail: AppointmentData.PatientEmail,
        PatientDob: AppointmentData.Problem,
        DoctorName: AppointmentData.DoctorName,
        DoctorPhone: AppointmentData.DoctorSpeciality,
        ApointmentDate: AppointmentData.DoctorLocation,
        ApointmentTime: AppointmentData.Date.slice(0,10) + " " + AppointmentData.Time, 
        diagnosis: AppointmentData.Diagnosis,
        tests: AppointmentData.Tests,
        prescriptions: AppointmentData.Prescription,
        notes: AppointmentData.Notes,
    });
    return (
        <PDFDownloadLink document={<MyDocument Diagnosis={Diagnosis} />} fileName={Diagnosis.PaitentName+"_"+Diagnosis.ApointmentDate+"_report.pdf"}>
            {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : <Button variant="contained" color="info"
                    sx={{width: "fit-content", margin: "auto", marginTop: "0px"}}
                >
                    Download Report
                </Button>
            }
        </PDFDownloadLink>
    );
};

export default DownloadReport;