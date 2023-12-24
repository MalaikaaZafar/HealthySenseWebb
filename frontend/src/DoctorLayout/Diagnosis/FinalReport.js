import React from "react";
import { useDiagnosis } from "./DiagnosisPage";
import { Avatar, Container, Tab, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";


const FinalReport = () => {
    const { PatientData, DoctorData, AppointmentData, Diagnosis } = useDiagnosis();
    return (
        <Container>
            <div className="row-display">
                <Avatar style={{ width: '60px', height: '60px', margin: 'auto' }} />
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>HealthySense </Typography>
            </div>
            <Typography variant="h4" style={{ textAlign: 'center' }}>Diagnosis Report</Typography>
            <div className="Column-display">
                <div className="column1">
                    <div className="row-display">
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Doctor: </Typography>
                        <Typography variant="h6">{DoctorData.name} </Typography>
                    </div>
                    <div className="row-display">
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Specialization: </Typography>
                        <Typography variant="h6">{DoctorData.Specialization} </Typography>
                    </div>
                    <div className="row-display">
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Date: </Typography>
                        <Typography variant="h6">{AppointmentData.Date} </Typography>
                    </div>
                    <div className="row-display">
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Time: </Typography>
                        <Typography variant="h6">{AppointmentData.Time} </Typography>
                    </div>

                </div>
                <div className="column2">
                    <div className="row-display">
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Name: </Typography>
                        <Typography variant="h6">{PatientData.name} </Typography>
                    </div>
                    <div className="row-display">
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Age: </Typography>
                        <Typography variant="h6">{PatientData.Age} </Typography>
                    </div>
                    <div className="row-display">
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Address: </Typography>
                        <Typography variant="h6">{PatientData.Address} </Typography>
                    </div>
                    <div className="row-display">
                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Phone: </Typography>
                        <Typography variant="h6">{PatientData.Phone} </Typography>
                    </div>
                </div>
            </div>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Diagnosis: </Typography>
            <Typography variant="h6">{Diagnosis.diagnosis} </Typography>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Prescription: </Typography>
            {Diagnosis.prescription.length > 0 ?
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Medicine</TableCell>
                            <TableCell>Dosage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Diagnosis.prescription.map((row) => (
                            <TableRow key={row.Name}>
                                <TableCell>{row.Name}</TableCell>
                                <TableCell>{row.Dosage}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                : <Typography variant="h6">None</Typography>}
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Tests: </Typography>
            {Diagnosis.tests.length > 0 ?
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Test</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Diagnosis.tests.map((row) => (
                            <TableRow key={row.Name}>
                                <TableCell>{row.Name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                : <Typography variant="h6">None</Typography>}
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Notes: </Typography>
            <Typography variant="h6">{Diagnosis.notes} </Typography>
        </Container>
    );
};

export default FinalReport;