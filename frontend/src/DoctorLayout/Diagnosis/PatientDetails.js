import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { useDiagnosis } from "./DiagnosisPage";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from "@mui/system";

const CustomTableRow = styled(TableRow)(({ }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    width: '100%',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
}));

const CustomTableCell = styled(TableCell)(({ }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    textAlign: 'left',
    wordBreak: 'normal',
    overflowWrap: 'break-word',
    width: '100%',
    border: 'none',
    gap: '10px'
}));



const PatientDetails = () => {
    const { AppointmentData, PageChange } = useDiagnosis();

    return (
        <Container style={{ marginTop: '50px' }}>
            <Button variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white', marginBottom: '20px' }}>Back</Button>
            <Container className="PatientDetails-Diag">
                <Typography variant="h4" style={{ textAlign: 'center' }}>Appointment Details</Typography>
                <div className="Column-display">
                    <div className="column1">
                        <Avatar style={{ width: '130px', height: '130px', margin: 'auto' }}
                        />
                    </div>
                    <div className="column2">
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
                </div>
            </Container>

            <Container className="PatientDetails-Diag">
                <Typography variant="h4" style={{ textAlign: 'center' }}>Patient Details</Typography>
                <div className="Column-display">
                    <div className="column1">
                        <Avatar style={{ width: '150px', height: '150px', margin: 'auto' }}
                        />
                    </div>
                    <div className="column2">
                        <div className="row-display">
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Name: </Typography>
                            <Typography variant="h6">{AppointmentData.patientId.user.name} </Typography>
                        </div>
                        <div className="row-display">
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Date of Birth: </Typography>
                            <Typography variant="h6">{AppointmentData.patientId.user.dob} </Typography>
                        </div>
                        <div className="row-display">
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Blood Group: </Typography>
                            <Typography variant="h6">{AppointmentData.patientId.bloodGroup} </Typography>
                        </div>
                        <div className="row-display">
                            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Phone: </Typography>
                            <Typography variant="h6">{AppointmentData.patientId.user.phoneNumber} </Typography>
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
                            <Table>
                                <TableHead>
                                    <CustomTableRow>
                                        <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '35%' }}>Type</CustomTableCell>
                                        <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '65%' }}>Description</CustomTableCell>
                                    </CustomTableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        AppointmentData.patientId.history.length > 0 ?
                                            AppointmentData.patientId.history.map((history, index) => {
                                                return (
                                                    <CustomTableRow>
                                                        <CustomTableCell style={{  width: '35%' }}>{history.type}</CustomTableCell>
                                                        <CustomTableCell style={{  width: '65%' }}>{history.description}</CustomTableCell>
                                                    </CustomTableRow>
                                                )
                                            })
                                            :
                                            <CustomTableRow>
                                                <CustomTableCell colSpan={3} style={{ textAlign: 'center' }}>No History </CustomTableCell>
                                            </CustomTableRow>
                                    }
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