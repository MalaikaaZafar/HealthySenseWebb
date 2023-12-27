import React from 'react';
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
} from '@mui/material';
import { styled } from '@mui/system';

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

const DataTable = ({ data, columns }) => (
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
                {data.map((item, index) => (
                    <StyledTableRow key={index}>
                        <TableCell>
                            {item.doctor ? (
                                <Link href="#" color="primary" underline="none">
                                    {item.doctor}
                                </Link>
                            ) : (
                                item.description
                            )}
                        </TableCell>
                        <TableCell>{item.date || item.type}</TableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

const PatientDetails = () => {
    const patient = {
        name: 'John Doe',
        phoneNumber: '+923332333444',
        gender: 'Male',
        dob: '01/01/2000',
        country: 'USA',
        medicalHistory: [
            { description: 'Diabjkkkkkkkketes', type: 'Chronkllllllljkkkkkkkkkkkkic' },
            { description: 'Hypertension', type: 'Chronic' }
            // Add more medical history items here
        ],
        previousAppointments: [
            { doctor: 'Dr. Amna Iruhhhhhhhhhhm', date: '01/01/2020' },
            { doctor: 'Dr. Moiz', date: '01/01/2021' }
            // Add more previous appointments here
        ]
    };

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

    const { name, phoneNumber, gender, dob, country, medicalHistory, previousAppointments } = patient;

    const patientDetails = [
        { label: 'Name', value: name },
        { label: 'Phone Number', value: formatPhoneNumber(phoneNumber) },
        { label: 'Gender', value: gender },
        { label: 'DOB', value: formatDate(dob) },
        { label: 'Country', value: country },
    ];

    return (
        <Container>
            <Box className={styles.bigPane} p={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                            <Box marginBottom={2}>
                                <StyledAvatar src="/images/photo.png" />
                            </Box>
                            <Grid container spacing={3}>
                                {patientDetails.slice(0, 2).map((detail, index) => (
                                    <Grid item xs={12} key={index}>
                                        <StyledTextField variant="outlined" value={detail.value} disabled label={detail.label} fullWidth />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ marginTop: '6px' }}>
                        <Grid container spacing={3}>
                            {patientDetails.slice(2).map((detail, index) => (
                                <Grid item xs={12} key={index}>
                                    <StyledTextField variant="outlined" value={detail.value} disabled label={detail.label} fullWidth />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={3} mt={1}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight={600} fontSize={18}>Medical History</Typography>
                        <DataTable data={medicalHistory} columns={['Description', 'Type']} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight={600} fontSize={18}>Previous Appointments</Typography>
                        <DataTable data={previousAppointments} columns={['Doctor', 'Date']} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default PatientDetails;