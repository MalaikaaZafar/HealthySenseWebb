import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import {
    Container,
    Grid,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Box,
    Link,
    CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

import styles from './PatientDetail.module.css';

const StyledAvatar = styled(Avatar)({
    width: '70px',
    height: '70px',
});

const StyledTextField = styled(TextField)(
    ({ theme }) => ({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'grey !important',
            },
            '&:hover fieldset': {
                borderColor: 'grey !important',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'grey !important',
            },
        },
        '& .MuiFormLabel-root': {
            color: 'black !important',
            fontWeight: 'bold',
        },
        "& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
            "-webkit-text-fill-color": "black !important",
            opacity: 1,
            color: 'black !important',
        },
    })
);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
}));

const StyledTableHead = styled(TableHead)`
  background-color: #2854C3;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f7f7f7;
  }
`;

const DataTable = ({ data, columns }) => {

    const { doctorId } = useParams();

    return (
        <TableContainer component={Paper}>
            <Table>
                <StyledTableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <StyledTableCell key={index}>{column}</StyledTableCell>
                        ))}
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {data.length > 0 ? data.map((item, index) => (
                        <StyledTableRow key={index}>
                            <TableCell>
                                {item.doctor ? (
                                    <Link href={`/${doctorId}/doctor/appointments/${item._id}`} color="inherit">
                                        {item.doctor}
                                    </Link>
                                ) : (
                                    item.description
                                )}
                            </TableCell>
                            <TableCell>{item.date || item.type}</TableCell>
                        </StyledTableRow>
                    )) :
                        <StyledTableRow>
                            <TableCell colSpan={columns.length} align="center">
                                No data available
                            </TableCell>
                        </StyledTableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const PatientDetails = () => {

    const [patient, setPatient] = useState({
        name: '',
        phoneNumber: '',
        gender: '',
        dob: '',
        country: '',
        medicalHistory: [],
        previousAppointments: [],
        complaints: [],
        image: null,
    });

    const [loading, setLoading] = useState(true);

    const url = process.env.REACT_APP_SERVER_URL;

    useEffect(() => {
        const getPatientDetails = async () => {
            await api.get('/doctor/patient-detail/6592fa7c57277a58b08e1f62')
                .then((res) => {
                    console.log(res.data);
                    setPatient(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getPatientDetails();

    }, []);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatPhoneNumber = (phoneNumberString) => {
        let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        let match = cleaned.match(/^(\d{2})(\d{3})(\d{7})$/);
        if (match) {
            return '+' + match[1] + '-' + match[2] + '-' + match[3];
        }
        return null;
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <Box className={styles.bigPane} p={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                            <Box marginBottom={2}>
                                {patient.image ? (
                                    <StyledAvatar src={`${url}/uploads/${patient.image}`} alt="Profile Picture" />
                                ) : (
                                    <StyledAvatar src="/images/photo.png" />
                                )}
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <StyledTextField variant="outlined" value={patient.name} disabled label="Name" fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <StyledTextField
                                        variant="outlined"
                                        value={formatPhoneNumber(patient.phoneNumber)}
                                        disabled
                                        label="Phone Number"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ marginTop: '6px' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <StyledTextField variant="outlined" value={patient.gender} disabled label="Gender" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <StyledTextField variant="outlined" value={formatDate(patient.dob)} disabled label="Date of Birth" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <StyledTextField variant="outlined" value={patient.country} disabled label="Country" fullWidth />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={3} mt={1}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight={600} fontSize={18}>Medical History</Typography>
                        <DataTable data={patient.medicalHistory} columns={['Description', 'Type']} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight={600} fontSize={18}>Previous Appointments</Typography>
                        <DataTable data={patient.previousAppointments} columns={['Doctor', 'Date']} />
                    </Grid>
                </Grid>
            </Box>
            {patient.complaints.length > 0 && (
                <>
                    <Typography variant="h6" color="text.primary" mb={2} mt={3} fontWeight={'bold'} fontSize={18}>
                        Latest Complaints
                    </Typography>
                    {patient.complaints.sort((a, b) => new Date(b.date) - new Date(a.date)).map((complaint, index) => (
                        <Paper key={index} sx={{ p: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 2, boxShadow: 3 }}>
                            <Typography variant="body1" color="text.secondary" sx={{ pr: 2, fontSize: 14, fontWeight: 'bold' }}>
                                {complaint.description}
                            </Typography>
                        </Paper>
                    ))}
                </>
            )}
        </Container>
    );
};

export default PatientDetails;