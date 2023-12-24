import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { useDiagnosis } from "./DiagnosisPage";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PatientDetails = () => {
    const { PatientData, DoctorData, AppointmentData, PageChange } = useDiagnosis();


    return (
        <Container style={{ marginTop: '50px' }}>
            <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginBottom: '20px' }}>Back</Button>
            <Container className="PatientDetails-Diag">
                <Typography variant="h4" style={{ textAlign: 'center' }}>Appointment Details</Typography>
                <div className="Column-display">
                    <div className="column1">
                        <Avatar style={{ width: '130px', height: '130px', margin: 'auto' }} />
                    </div>
                    <div className="column2">
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
                </div>
            </Container>

            <Container className="PatientDetails-Diag">
                <Typography variant="h4" style={{ textAlign: 'center' }}>Patient Details</Typography>
                <div className="Column-display">
                    <div className="column1">
                        <Avatar style={{ width: '150px', height: '150px', margin: 'auto' }} />
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
                        <div className="row-display">
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Email: </Typography>
                            <Typography variant="h6">{PatientData.Email} </Typography>
                        </div>
                    </div>
                </div>
                <Container style={{ marginTop: '30px' }}>
                    <Accordion>
                        <AccordionSummary
                            style={{ marginBottom: '0px' }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '0px' }}>Patient History</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell style={{ width: '20%', fontWeight: 'bold' }}>Type</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {PatientData.History.map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell style={{ width: '20%' }}>{item.Type}</TableCell>
                                                <TableCell>{item.Description}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )}
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                </Container>
            </Container>
            <Container style={{ display: 'flex', justifyContent: 'end', paddingRight: '0px' }}>
                <Button 
                    variant="contained" 
                    style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }}
                    onClick={() => PageChange(2)}
                >
                    Confirm Details
                </Button>
            </Container>
        </Container>
    )
}

export default PatientDetails