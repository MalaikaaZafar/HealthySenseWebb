import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import "@fontsource/roboto";
import GetReport from "../../services/user/getReport";
import "./Report.css";
import LoadingAnimation from "../../components/loader/LoadingAnimation";
import { Box, Snackbar, Alert, Button, Table, TableBody, TableCell, TableHead, TableRow, Container, Avatar, Typography } from "@mui/material";

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
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState({});
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    const getReportdata = async () => {
        const data = await GetReport(id);
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
                navigate('/login');
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
                        backgroundColor: 'lightgrey',
                        minHeight: '100%',
                        py: 3,
                    }}
                >
                    <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'left',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            width: '100%',
                            gap: '30px',
                            border: '1px solid rgba(224, 224, 224, 1)',
                            borderRadius: '10px',
                            padding: '20px',
                            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                            backgroundColor: 'white',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '0fr 3fr',
                                justifyContent: 'left',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => {
                                    //navigate('/patient/reports');
                                }}
                                color="info"
                                style={{
                                    fontSize: '12px',
                                    justifySelf: 'left',
                                }}
                            >
                                Back
                            </Button>
                            <p style={{ fontSize: '30px', fontWeight: 'bold', justifySelf: 'center', textAlign: 'center', marginLeft: '-110px' }}>Report</p>
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
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'left',
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    width: '100%',
                                    gap: '10px',
                                    py: 3,
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                    borderTop: '1px solid rgba(224, 224, 224, 1)',
                                }}
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
                                        marginLeft:'30px'
                                    }}
                                    className='adjust'
                                >
                                    <Avatar alt="Remy Sharp" src={`http://localhost:5000/${report.DoctorProfilePicture}`} sx={{ width: 100, height: 100 }} />
                                </Box>
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
                                        marginRight:'30px'
                                    }}
                                    className='adjust'
                                >
                                    <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                        Dr. {report.DoctorName}
                                    </Typography>
                                    <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText' }}>
                                        {report.DoctorSpeciality}
                                    </Typography>
                                    <Typography variant="body2" component="div" style={{ fontWeight: 'bold', color: 'GrayText' }}>
                                        {report.DoctorLocation}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'left',
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    width: '100%',
                                    gap: '10px',
                                    py: 3,
                                    borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                }}
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
                                        marginLeft:'30px'
                                    }}
                                    className='adjust'
                                >
                                    <Avatar alt="Remy Sharp" src={`http://localhost:5000/${report.PatientProfilePicture}`} sx={{ width: 100, height: 100 }} />
                                </Box>
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
                                        marginRight:'30px'
                                    }}
                                    className='adjust'
                                >
                                    <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                        {report.PatientName}
                                    </Typography>
                                    <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText' }}>
                                        {report.PatientEmail}
                                    </Typography>
                                    <Typography variant="body2" component="div" style={{ fontWeight: 'bold', color: 'GrayText' }}>
                                        {report.PatientPhoneNumber}
                                    </Typography>
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
                                        <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft:'30px' }}>
                                            Appointment Date
                                        </Typography>
                                        <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginRight:'30px' }}>
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
                                        <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft:'30px' }}>
                                            Appointment Time
                                        </Typography>
                                        <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginRight:'30px' }}>
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
                                        <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft:'30px' }}>
                                            Paitent Problem
                                        </Typography>
                                        <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginRight:'30px' }}>
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
                                <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft:'30px' }}>
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
                                <Typography variant="body1" component="div" style={{ fontWeight: 'bold', color: 'GrayText', marginLeft:'30px' }}>
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
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        navigate('/patient/reports');
                                    }}
                                    color="info"
                                    style={{
                                        fontSize: '12px',
                                    }}
                                >
                                    Download Report
                                </Button>
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