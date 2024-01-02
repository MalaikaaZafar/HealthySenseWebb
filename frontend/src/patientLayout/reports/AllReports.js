import { Alert, Snackbar, TableRow, TableCell, Table, TableHead, TableBody, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GetAllDiagnosis from '../../services/patient/report/GetAllDiagnosis';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingAnimation from '../../components/Loader/LoadingAnimation';
import { Container, styled } from "@mui/system";
import SummarizeIcon from '@mui/icons-material/Summarize';


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

const AllReports = () => {
    const navigate = useNavigate();
    const { patientId } = useParams();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);

    const getReports = async () => {
        const response = await GetAllDiagnosis(patientId);
        if (response !== null) {
            console.log(response);
            setReports(response);
            setLoading(false);
        }
        else {
            setMsg('Something went wrong');
            setOpen(true);
            setTimeout(() => {
                navigate('../');
            }, 2000);
        }
    }

    useEffect(() => {
        getReports();
    }, []);

    return (
        <>
            <LoadingAnimation isVisible={loading} />
            {
                !loading &&
                <Container
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        width: '100%',
                        gap: '20px',
                        outerHeight: '100%',
                        marginTop: '30px',
                        padding: '30px',
                        borderRadius: '10px',
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                    }}
                >
                    <Typography variant='h4' style={{ fontWeight: 'bold', fontSize: '30px', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '0px' }}>
                        <SummarizeIcon style={{ fontSize: '30px', marginRight: '10px' }} />
                        Diagnosis Reports
                    </Typography>
                    <Container>
                        <Table style={{
                            width: '100%',
                            border: '1px solid rgba(224, 224, 224, 1)',
                        }}>
                            <TableHead>
                                <CustomTableRow>
                                    <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '20%' }}>Problem</CustomTableCell>
                                    <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '20%' }}>Doctor</CustomTableCell>
                                    <CustomTableCell className='disappear' style={{ fontWeight: 'bold', fontSize: '16px', width: '20%' }}>Date & Time</CustomTableCell>
                                    <CustomTableCell className='disappear' style={{ fontWeight: 'bold', fontSize: '16px', width: '10%' }}>Type</CustomTableCell>
                                    <CustomTableCell style={{ fontWeight: 'bold', fontSize: '16px', width: '10%' }}>Payment</CustomTableCell>
                                    <CustomTableCell style={{ width: '20%' }}></CustomTableCell>
                                </CustomTableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    reports.length > 0 ?
                                        reports.map((report, index) => {
                                            return (
                                                <CustomTableRow id={index}>
                                                    <CustomTableCell style={{ width: '20%' }}>{report.problem}</CustomTableCell>
                                                    <CustomTableCell style={{ width: '20% ' }}>{report.doctorName}</CustomTableCell>
                                                    <CustomTableCell className='disappear' style={{ width: '20% ' }}>{report.date.slice(0, 10) + " | " + report.time}</CustomTableCell>
                                                    <CustomTableCell className='disappear' style={{ width: '10% ' }}>{report.type}</CustomTableCell>
                                                    <CustomTableCell style={{ width: '10% ' }}>{report.paymentStatus}</CustomTableCell>
                                                    <CustomTableCell style={{
                                                        width: '20%',
                                                        flexWrap: 'wrap',
                                                        justifyContent: 'right',
                                                    }}>
                                                        <Button
                                                            variant="contained"
                                                            onClick={() => {
                                                                navigate(`/patient/report/${report.id}`);
                                                            }}
                                                            color="info"
                                                            style={{
                                                                fontSize: '12px',
                                                            }}
                                                        >
                                                            View Report
                                                        </Button>
                                                    </CustomTableCell>
                                                </CustomTableRow>
                                            )
                                        })
                                        :
                                        <CustomTableRow>
                                            <CustomTableCell style={{ width: '100%' }}>No Diagnosis Reports Availabile</CustomTableCell>
                                        </CustomTableRow>
                                }
                            </TableBody>
                        </Table>
                    </Container>

                </Container>
            }

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
            >
                <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AllReports