import React from "react";
import MyDocument from "./ReportTemplate";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useImmer } from "use-immer";
import { Button } from "@mui/material";

const ViewReport = () => {
    const [Diagnosis, setDiagnosis] = useImmer({
        PaitentName: "Siddharth",
        PatientPhone: "1234567890",
        PatientEmail: "blah",
        PatientDob: "20",
        DoctorName: "Dr. XYZ",
        DoctorPhone: "1234567890",
        ApointmentDate: "20",
        ApointmentTime: "20pm",
        diagnosis: "The patient is suffering from blah blah blah",
        tests: [],
        prescriptions: [],
        notes: "blah blah blah",
    });
    return (
        <PDFDownloadLink document={<MyDocument Diagnosis={Diagnosis} />} fileName="report.pdf">
            {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : <Button variant="contained" className="downloadReportbtn">Download Report</Button>
            }
        </PDFDownloadLink>
    );
};

export default ViewReport;