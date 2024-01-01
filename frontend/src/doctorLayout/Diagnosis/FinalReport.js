import React from "react";
import { useDiagnosis } from "./DiagnosisPage";
import { Avatar, Container, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Snackbar, Alert } from "@mui/material";
import HealthySenseLogo from '../../components/healthySenseLogo.png';
import { styled, Box } from '@mui/system';
import { useNavigate } from "react-router-dom";
import saveDiagnosis from "../../services/doctor/diagnosis/saveDiagnosis";
import "../../pages/report/Report.css";
import "@fontsource/roboto";
import DoctorSidePanel from "../../components/doctorSidePanel";


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

const FinalReport = () => {
    const { AppointmentData, Diagnosis, PageChange, setDiagnosis } = useDiagnosis();
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    const [variant, setVariant] = React.useState("success");
    const naviagte = useNavigate();

    const HandleDiagnosis = async () => {
        const index = AppointmentData.doctorId.session.findIndex((session) => session.type === AppointmentData.type);
        setDiagnosis(draft => {
            draft.type = AppointmentData.type;
            draft.fee = AppointmentData.doctorId.session[index].fee;
        });
        console.log(Diagnosis);
        const ID = await saveDiagnosis(AppointmentData._id, Diagnosis);
        if (ID) {
            setOpen(true);
            setMsg("Diagnosis Saved Successfully");
            setVariant("success");
            setTimeout(() => {
                //naviagte(`/doctor/report/${AppointmentData._id}`);
            }, 2000);
        }
        else {
            setOpen(true);
            setMsg("Something Went Wrong");
            setVariant("error");
            setTimeout(() => {
                //naviagte(`/doctor/appointments`);
            }, 2000);
        }
    }

    return (
        <>
            <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'left', gap: '10%' }} className='change' >
                <DoctorSidePanel appt={AppointmentData} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'inherit',
                        py: 3
                    }}
                >
                    <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                            py: 3,
                        }}
                    >
                        <Button variant="contained"
                            style={{ backgroundColor: '#3f51b5', color: 'white', marginBottom: '20px' }}
                            onClick={() => PageChange(1)}
                        >
                            Back
                        </Button>
                        <Container
                            sx={{
                                py: 3,
                                border: '1px solid black'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '0fr 1fr',
                                    backgroundColor: '#3f51b5',
                                    color: 'white',
                                }}
                            >
                                <Container
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'left',
                                    }}
                                >
                                    <Avatar style={{ width: '50px', height: '50px', marginRight: '10px' }} src={HealthySenseLogo} />
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>HealthySense </Typography>
                                </Container>
                                <Container
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'right',
                                    }}
                                >
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Diagnosis Report</Typography>
                                </Container>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                }}
                                className="changes"
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        width: '100%',
                                        gap: '10px',
                                        py: 3,
                                        borderRight: '1px solid rgba(224, 224, 224, 1)',
                                    }}
                                    className="changes1"
                                >
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Doctor Details </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'flex-end',
                                            textAlign: 'left',
                                            wordBreak: 'break-word',
                                            overflowWrap: 'break-word',
                                            width: '100%',
                                            gap: '10px',
                                            marginRight: '30px'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                            }}
                                        >
                                            <Typography variant="h6" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft: '30px' }}>Doctor: </Typography>
                                            <Typography variant="h6" style={{ fontWeight: 'bold', color: 'GrayText', marginRight: '30px' }}>Dr. {AppointmentData.doctorId.user.name} </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                            }}
                                        >
                                            <Typography variant="body1" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft: '30px' }}>Specialization: </Typography>
                                            <Typography variant="body1" style={{ fontWeight: 'bold', color: 'GrayText', marginRight: '30px' }}>{AppointmentData.doctorId.specialization} </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                                gap: '10px',
                                            }}
                                        >
                                            <Typography variant="body1" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft: '30px' }}>Location: </Typography>
                                            <Typography variant="body1" style={{ fontWeight: 'bold', color: 'GrayText', marginRight: '30px' }}>{AppointmentData.doctorId.location} </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        textAlign: 'left',
                                        wordBreak: 'break-word',
                                        overflowWrap: 'break-word',
                                        width: '100%',
                                        gap: '10px',
                                        py: 3,
                                        marginLeft: '30px'
                                    }}
                                    className="changes1"
                                >
                                    <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                        Patient Details
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'flex-end',
                                            textAlign: 'left',
                                            wordBreak: 'break-word',
                                            overflowWrap: 'break-word',
                                            width: '100%',
                                            gap: '10px',
                                            marginRight: '30px'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                textAlign: 'left',
                                                wordBreak: 'break-word',
                                                overflowWrap: 'break-word',
                                                width: '100%',
                                            }}
                                        >
                                            <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft: '30px' }}>
                                                Patient Name
                                            </Typography>
                                            <Typography variant="h6" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginRight: '30px' }}>
                                                {AppointmentData.patientId.user.name}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                textAlign: 'left',
                                                wordBreak: 'break-word',
                                                overflowWrap: 'break-word',
                                                width: '100%',
                                            }}
                                        >
                                            <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft: '30px' }}>
                                                Patient Email
                                            </Typography>
                                            <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginRight: '30px' }}>
                                                {AppointmentData.patientId.user.email}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                textAlign: 'left',
                                                wordBreak: 'break-word',
                                                overflowWrap: 'break-word',
                                                width: '100%',
                                            }}
                                        >
                                            <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft: '30px' }}>
                                                Patient Phone No
                                            </Typography>
                                            <Typography variant="body2" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginRight: '30px' }}>
                                                {AppointmentData.patientId.user.phoneNumber}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'left',
                                    alignItems: 'flex-start',
                                    textAlign: 'left',
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    width: '100%',
                                    gap: '10px',
                                    py: 3,
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                }}
                            >
                                <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                    Appointment Details:
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textAlign: 'left',
                                        wordBreak: 'break-word',
                                        overflowWrap: 'break-word',
                                        width: '100%',
                                        gap: '10px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            textAlign: 'left',
                                            wordBreak: 'break-word',
                                            overflowWrap: 'break-word',
                                            width: '100%',
                                            gap: '10px',
                                        }}
                                    >
                                        <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft: '30px' }}>
                                            Appointment Date
                                        </Typography>
                                        <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginRight: '30px' }}>
                                            {AppointmentData.date}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            textAlign: 'left',
                                            wordBreak: 'break-word',
                                            overflowWrap: 'break-word',
                                            width: '100%',
                                            gap: '10px',
                                        }}
                                    >
                                        <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft: '30px' }}>
                                            Appointment Time
                                        </Typography>
                                        <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginRight: '30px' }}>
                                            {AppointmentData.time}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            textAlign: 'left',
                                            wordBreak: 'break-word',
                                            overflowWrap: 'break-word',
                                            width: '100%',
                                            gap: '10px',
                                        }}
                                    >
                                        <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft: '30px' }}>
                                            Paitent Problem
                                        </Typography>
                                        <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginRight: '30px' }}>
                                            {AppointmentData.problem}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    width: '100%',
                                    gap: '10px',
                                    py: 3,
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                }}
                            >
                                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Diagnosis: </Typography>
                                <Typography variant="body1">{Diagnosis.diagnosis} </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    width: '100%',
                                    gap: '10px',
                                    py: 3,
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                }}
                            >
                                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Prescription: </Typography>
                                <Table
                                    sx={{
                                        border: '1px solid rgba(100, 100, 100, 0.5)',
                                    }}
                                >
                                    <TableHead>
                                        <CustomTableRow>
                                            <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '30%' }}>Medicine</CustomTableCell>
                                            <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '70%' }}>Dosage</CustomTableCell>
                                        </CustomTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Diagnosis.prescription.length > 0 ?
                                            Diagnosis.prescription.map((item, index) => {
                                                return (
                                                    <CustomTableRow>
                                                        <CustomTableCell style={{ width: '30%' }}>{item.Name}</CustomTableCell>
                                                        <CustomTableCell style={{ width: '70%' }}>{item.Dosage}</CustomTableCell>
                                                    </CustomTableRow>
                                                )
                                            }) :
                                            <CustomTableRow>
                                                <CustomTableCell>No Prescription</CustomTableCell>
                                            </CustomTableRow>
                                        }
                                    </TableBody>
                                </Table>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    width: '100%',
                                    gap: '10px',
                                    py: 3,
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                }}
                            >
                                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Tests: </Typography>
                                <Table
                                    sx={{
                                        border: '1px solid rgba(100, 100, 100, 0.5)',
                                    }}
                                >
                                    <TableHead>
                                        <CustomTableRow>
                                            <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '100%' }}>Test</CustomTableCell>
                                        </CustomTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Diagnosis.tests.length > 0 ?
                                            Diagnosis.tests.map((item, index) => {
                                                return (
                                                    <CustomTableRow>
                                                        <CustomTableCell style={{ width: '100%' }}>{item}</CustomTableCell>
                                                    </CustomTableRow>
                                                )
                                            }) :
                                            <CustomTableRow>
                                                <CustomTableCell>No Tests</CustomTableCell>
                                            </CustomTableRow>
                                        }
                                    </TableBody>
                                </Table>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    width: '100%',
                                    gap: '10px',
                                    py: 3,
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                }}
                            >
                                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Notes: </Typography>
                                <Typography variant="body1">{Diagnosis.notes} </Typography>
                            </Box>
                        </Container>
                        <Container
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'right',
                                width: '100%',
                                py: 1,
                            }}
                        >
                            <Button variant="contained"
                                style={{ backgroundColor: '#3f51b5', color: 'white', marginTop: '20px' }}
                                onClick={() => HandleDiagnosis()}
                            >
                                Finish Diagnosis
                            </Button>
                        </Container>
                    </Container>

                </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={variant} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>

    );
};

export default FinalReport;