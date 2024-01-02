import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import "@fontsource/roboto";
import GetReport from "../../services/user/getReport";
import "./Report.css";
import { Box, Snackbar, Alert, Button, Table, TableBody, TableCell, TableHead, TableRow, Container, Typography, Avatar } from "@mui/material";
import HealthySenseLogo from "../../components/healthySenseLogo.png";
import DownloadReport from "../../components/Report/DownloadReport";
import LoadingAnimation from "../../components/Loader/LoadingAnimation";


const CustomTableRow = styled(TableRow)(({ }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    width: '100%',
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

const ViewReportPatient = () => {
    const { diagid } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState({});
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    const getReportdata = async () => {
        const data = await GetReport(diagid);
        if (data) {
            setReport(data);
            setLoading(false);
            console.log(data);
        }
        else {
            setMsg('Error getting report');
            setOpen(true);
            setTimeout(() => {
                //navigate('/app/patient');
            }, 2000);
        }
    }

    useEffect(() => {
        getReportdata();
    }, []);

    return (
        <>
            <LoadingAnimation isVisible={loading} />
            {
                !loading &&
                <Box
                    sx={{
                        backgroundColor: 'inherit',
                        minHeight: '100%',
                        py: 3,
                    }}
                >
                    <Container
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
                            border: '1px solid rgba(224, 224, 224, 1)',
                            borderRadius: '10px',
                            padding: '20px',
                            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                            backgroundColor: 'white',
                        }}
                        className="changes1"
                    >
                        <Button
                            variant="contained"
                            onClick={() => {
                                navigate('/patient/reports');
                            }}
                            color="info"
                            style={{
                                fontSize: '12px',
                                justifySelf: 'left',
                            }}
                        >
                            Back
                        </Button>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                backgroundColor: '#3f51b5',
                                color: 'white',
                                width: '100%',
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
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'left',
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                                width: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                }}
                                className="changes2"
                            >
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
                                        borderRight: '1px solid rgba(224, 224, 224, 1)',
                                    }}
                                    className="changes3"
                                >
                                    <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                        Doctor Details
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
                                                Doctor Name
                                            </Typography>
                                            <Typography variant="h6" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginRight: '30px' }}>
                                                Dr. {report.DoctorName}
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
                                                Doctor Specialization
                                            </Typography>
                                            <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginRight: '30px' }}>
                                                {report.DoctorSpeciality}
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
                                                Doctor Location
                                            </Typography>
                                            <Typography variant="body2" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginRight: '30px' }}>
                                                {report.DoctorLocation}
                                            </Typography>
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
                                        marginLeft: '30px',
                                    }}
                                    className="changes3"
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
                                                {report.PatientName}
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
                                                {report.PatientEmail}
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
                                                {report.PatientPhoneNumber}
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
                                            {report.Date.slice(0, 10)}
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
                                            {report.Time}
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
                                            {report.Problem}
                                        </Typography>
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
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                }}
                            >
                                <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                    Diagnosis
                                </Typography>
                                <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft: '30px' }}>
                                    {report.Diagnosis}
                                </Typography>
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
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                }}
                            >
                                <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                    Prescription
                                </Typography>
                                <Table
                                    sx={{
                                        width: '100%',
                                        border: '1px solid rgba(100, 100, 100, 0.5)',
                                    }}
                                >
                                    <TableHead>
                                        <CustomTableRow>
                                            <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '35%' }}>Medicine</CustomTableCell>
                                            <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '65%' }}>Dosage & Duration</CustomTableCell>
                                        </CustomTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            report.Prescription.length > 0 ?
                                                report.Prescription.map((prescription, index) => {
                                                    return (
                                                        <CustomTableRow key={index}
                                                            style={{
                                                                borderTop: '1px solid rgba(224, 224, 224, 1)',
                                                                borderBottom: 'none',
                                                            }}
                                                        >
                                                            <CustomTableCell style={{ width: '35%' }}>{prescription.Name}</CustomTableCell>
                                                            <CustomTableCell style={{ width: '65%' }}>{prescription.Dosage}</CustomTableCell>
                                                        </CustomTableRow>
                                                    )
                                                }
                                                ) :
                                                <CustomTableRow>
                                                    <CustomTableCell style={{ width: '100%' }}>No Prescriptions</CustomTableCell>
                                                </CustomTableRow>
                                        }
                                    </TableBody>
                                </Table>
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
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                }}
                            >
                                <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                    Tests
                                </Typography>
                                <Table
                                    sx={{
                                        width: '100%',
                                        border: '1px solid rgba(100, 100, 100, 0.5)',
                                    }}
                                >
                                    <TableHead>
                                        <CustomTableRow>
                                            <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '100%' }}>Test Name</CustomTableCell>
                                        </CustomTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            report.Tests.length > 0 ?
                                                report.Tests.map((test, index) => {
                                                    return (
                                                        <CustomTableRow key={index}
                                                            style={{
                                                                borderTop: '1px solid rgba(224, 224, 224, 1)',
                                                                borderBottom: 'none',
                                                            }}
                                                        >
                                                            <CustomTableCell style={{ width: '100%' }}>{test}</CustomTableCell>
                                                        </CustomTableRow>
                                                    )
                                                }
                                                ) :
                                                <CustomTableRow>
                                                    <CustomTableCell style={{ width: '100%' }}>No Tests</CustomTableCell>
                                                </CustomTableRow>
                                        }
                                    </TableBody>
                                </Table>
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
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                }}
                            >
                                <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                    Notes
                                </Typography>
                                <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft: '30px' }}>
                                    {report.Notes}
                                </Typography>
                            </Box>
                            <Container
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'right',
                                    alignItems: 'center',
                                    gap: '10px',
                                    py: 3,
                                }}
                            >
                                <DownloadReport AppointmentData={report} />
                            </Container>
                        </Box>
                    </Container>
                </Box>
            }
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
}

export default ViewReportPatient;