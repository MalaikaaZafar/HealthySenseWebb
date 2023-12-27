import React from "react";
import { useDiagnosis } from "./DiagnosisPage";
import { Avatar, Container, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import HealthySenseLogo from '../../components/healthySenseLogo.png';
import axios from "axios";


const FinalReport = () => {
    const { AppointmentData, Diagnosis, PageChange, setDiagnosis } = useDiagnosis();

    const HandleDiagnosis = async () => {
        console.log(Diagnosis);
        setDiagnosis(draft => {
            draft.type = AppointmentData.type;
            draft.fee = AppointmentData.doctorId.session.find((session) => session.type === AppointmentData.type).fee;
        });
        try{
            const response = await axios.post(`http://localhost:5000/doctor/appointments/${AppointmentData._id}/diagnosis`, Diagnosis);
            console.log(response);
            PageChange(1);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <Container>
            <Button variant="contained"
                style={{ backgroundColor: '#3f51b5', color: 'white', marginBottom: '20px' }}
                onClick={() => PageChange(2)}
            >
                Back
            </Button>
            <Container>
                <div className="row-display" style={{ alignItems: 'center', justifyContent: 'left', gap: '15px', marginTop: '30px' }}>
                    <Avatar style={{ width: '60px', height: '60px', margin: 'none', backgroundColor: '#3f51b5' }} src={HealthySenseLogo} />
                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>HealthySense </Typography>
                </div>
                <Typography variant="h4" style={{ textAlign: 'center', marginTop:'-30px' }}>Diagnosis Report</Typography>
                <div className="Column-display">
                    <div className="column1">
                        <div className="row-display">
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Doctor: </Typography>
                            <Typography variant="h6">{AppointmentData.doctorId.user.name} </Typography>
                        </div>
                        <div className="row-display">
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Specialization: </Typography>
                            <Typography variant="h6">{AppointmentData.doctorId.specialization} </Typography>
                        </div>
                        <div className="row-display">
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Date: </Typography>
                            <Typography variant="h6">{AppointmentData.date} </Typography>
                        </div>
                        <div className="row-display">
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Time: </Typography>
                            <Typography variant="h6">{AppointmentData.time} </Typography>
                        </div>

                    </div>
                    <div className="column2">
                        <div className="row-display">
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Name: </Typography>
                            <Typography variant="h6">{AppointmentData.patientId.user.name} </Typography>
                        </div>
                        <div className="row-display">
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Age: </Typography>
                            <Typography variant="h6">{AppointmentData.patientId.user.dob} </Typography>
                        </div>
                        <div className="row-display">
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Address: </Typography>
                            <Typography variant="h6">{AppointmentData.patientId.bloodGroup} </Typography>
                        </div>
                        <div className="row-display">
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Phone: </Typography>
                            <Typography variant="h6">{AppointmentData.patientId.phoneNumber} </Typography>
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
                                <TableRow key={row}>
                                    <TableCell>{row}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    : <Typography variant="h6">None</Typography>}
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Notes: </Typography>
                <Typography variant="h6">{Diagnosis.notes} </Typography>
            </Container>
            <Button variant="contained"
                style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }}
                onClick={() => HandleDiagnosis()}
            >
                Finish Diagnosis
            </Button>

        </Container>
    );
};

export default FinalReport;