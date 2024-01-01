import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/system';
import {
    Button,
    TextField,
    Grid,
    Typography,
    InputAdornment,
    Chip,
    Box,
    IconButton,
    Container,
    CssBaseline,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    Hidden,
} from '@mui/material';
import { TimePicker, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import Description from '@mui/icons-material/Description';
import LocationOn from '@mui/icons-material/LocationOn';
import Category from '@mui/icons-material/Category';
import Money from '@mui/icons-material/Money';
import LocalHospital from '@mui/icons-material/LocalHospital';
import School from '@mui/icons-material/School';
import CalendarToday from '@mui/icons-material/CalendarToday';
import UploadFile from '@mui/icons-material/UploadFile';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Register.module.css';

const CustomTextField = styled(TextField)({
    '& .MuiInputAdornment-root.MuiInputAdornment-positionStart': {
        marginTop: '0.7rem',
        marginBottom: 'auto',
    },
});

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(0, 0, 0),
}));

const RegisterDoctor = () => {
    const [doctor, setDoctor] = useState({
        specialization: '',
        description: '',
        location: '',
        experience: '',
        session: [
            { type: 'Online', fee: '' },
            { type: 'Clinic', fee: '' },
        ],
        services: [],
        appointmentSlots: [],
        certificates: [],
    });

    const [currentService, setCurrentService] = useState('');
    const [showServiceInput, setShowServiceInput] = useState(false);

    const [showAppointmentInput, setShowAppointmentInput] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
    const [selectedTime, setSelectedTime] = useState(new Date().setHours(0, 0, 0, 0));
    const [selectedType, setSelectedType] = useState('Online');

    const [currentCertificate, setCurrentCertificate] = useState({
        name: '',
        description: '',
        issueDate: dayjs(new Date()),
        expiryDate: null,
        file: null
    });
    const [showCertificateInput, setShowCertificateInput] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);

    const navigate = useNavigate();

    const openDialog = () => {
        setDialogOpen(true);
    }

    const closeDialog = () => {
        setDialogOpen(false);
    }

    const downloadFile = () => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(currentCertificate.file);
        link.download = currentCertificate.file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleAddCertificate = () => {
        if (!showCertificateInput) {
            setShowCertificateInput(true);
        } else {
            setShowCertificateInput(false);
            setCurrentCertificate({
                name: '',
                description: '',
                issueDate: dayjs(new Date()),
                expiryDate: null,
                file: null
            });
        }
    };

    const handleCertificateIssueDateChange = (newValue) => {
        setCurrentCertificate({ ...currentCertificate, issueDate: newValue });
    };

    const handleCertificateExpiryDateChange = (newValue) => {
        setCurrentCertificate({ ...currentCertificate, expiryDate: newValue });
    };

    const handleRemoveCertificate = (certificateToRemove) => {
        setDoctor(prevDoctor => ({
            ...prevDoctor,
            certificates: prevDoctor.certificates.filter(certificate => certificate !== certificateToRemove)
        }));
    };

    const handleCertificateChange = (e) => {
        setCurrentCertificate({ ...currentCertificate, [e.target.name]: e.target.value });
    };

    const handleCertificateFileChange = (e) => {
        setCurrentCertificate({ ...currentCertificate, file: e.target.files[0] });
    };

    const handleRemoveCertificateFileChange = (e) => {
        setCurrentCertificate({ ...currentCertificate, file: null });
    };

    const containsCertificate = (certificate) => {
        for (let i = 0; i < doctor.certificates.length; i++) {
            if (doctor.certificates[i].name === certificate.name) {
                return true;
            }
        }
        return false;
    };

    const handleCertificateSubmit = (event) => {
        event.preventDefault();
        if (!currentCertificate.file || currentCertificate.name.trim() === '' || currentCertificate.description.trim() === '' || !currentCertificate.issueDate || containsCertificate(currentCertificate)) {
            return;
        }
        setDoctor(prevDoctor => ({ ...prevDoctor, certificates: [...prevDoctor.certificates, currentCertificate] }));
        setCurrentCertificate({
            name: '',
            description: '',
            issueDate: dayjs(new Date()),
            expiryDate: null,
            file: null
        });
        setShowCertificateInput(false);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (newValue) => {
        setSelectedTime(newValue);
    };

    const handleAddAppointmentSlot = () => {
        if (!showAppointmentInput) {
            setShowAppointmentInput(true);
        } else {
            setShowAppointmentInput(false);
            setSelectedDate(dayjs(new Date()));
            setSelectedTime(new Date().setHours(0, 0, 0, 0));
        }
    };

    const checkAppointmentSlot = (date, time) => {
        const [hours, minutes] = time.split(':');
        const appointmentSlotTime = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
        const formattedDate = dayjs(date).format('DD/MM/YYYY');

        for (let i = 0; i < doctor.appointmentSlots.length; i++) {
            const currentAppointmentSlot = doctor.appointmentSlots[i];
            const currentDate = dayjs(currentAppointmentSlot.date).format('DD/MM/YYYY');
            const currentTime = currentAppointmentSlot.time;
            const [currentHours, currentMinutes] = currentTime.split(':');
            const currentAppointmentSlotTime = parseInt(currentHours, 10) * 60 + parseInt(currentMinutes, 10);

            if (
                (formattedDate === currentDate && Math.abs(appointmentSlotTime - currentAppointmentSlotTime) < 10) ||
                (formattedDate !== currentDate && (1440 - currentAppointmentSlotTime + appointmentSlotTime) < 10)
            ) {
                return false;
            }
        }

        return true;
    };

    const handleAppointmentSlotSubmit = () => {
        if (selectedDate && selectedTime) {
            const formattedTime = format(selectedTime, 'HH:mm');
            if (checkAppointmentSlot(selectedDate, formattedTime)) {
                const appointmentSlot = {
                    date: selectedDate,
                    time: formattedTime,
                    type: selectedType,
                }
                setDoctor(prevDoctor => ({ ...prevDoctor, appointmentSlots: [...prevDoctor.appointmentSlots, appointmentSlot] }));
                setSelectedDate(dayjs(new Date()));
                setSelectedTime(new Date().setHours(0, 0, 0, 0));
                setSelectedType('Online');
            } else {
                alert('Appointment slots cannot be less than 10 minutes apart.');
            }
        } else {
            alert('Please select a day and a time slot.');
        }
    };

    const handleRemoveAppointment = (appointment) => {
        setDoctor(prevDoctor => ({ ...prevDoctor, appointmentSlots: prevDoctor.appointmentSlots.filter(s => s !== appointment) }));
    };

    const handleAddService = () => {
        if (!showServiceInput) {
            setShowServiceInput(true);
        } else {
            setShowServiceInput(false);
            setCurrentService('');
        }
    };

    const handleServiceChange = (event) => {
        setCurrentService(event.target.value);
    };

    const handleServiceSubmit = (event) => {
        event.preventDefault();
        if (!doctor.services.includes(currentService) && currentService.trim() !== '') {
            setDoctor(prevDoctor => ({ ...prevDoctor, services: [...prevDoctor.services, currentService] }));
            setCurrentService('');
            setShowServiceInput(false);
        } else {
            alert('This service already exists.');
        }
    };

    const handleRemoveService = (service) => {
        setDoctor(prevDoctor => ({ ...prevDoctor, services: prevDoctor.services.filter(s => s !== service) }));
    };

    const handleSessionChange = (event) => {
        setDoctor(prevDoctor => ({
            ...prevDoctor,
            session: prevDoctor.session.map(s => s.type === event.target.name ? { ...s, fee: event.target.value } : s)
        }));
    };

    const handleChange = (e) => {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(doctor).forEach(key => {
            if (key === 'certificates') {
                doctor.certificates.forEach((certificate, index) => {
                    formData.append(`certificates[${index}]`, certificate.file);
                });
                formData.append('certificates', JSON.stringify(doctor.certificates.map(certificate => {
                    const { file, ...certificateWithoutFile } = certificate;
                    return certificateWithoutFile;
                })));
            } else {
                formData.append(key, JSON.stringify(doctor[key]));
            }
        });

        console.log(doctor);

        axios.post('http://localhost:3000/doctor/register', formData, { withCredentials: true })
            .then(res => {
                navigate('/doctor');
            })
            .catch(err => {
                console.log(err);
                if (err.response)
                    alert(err.response.data.message);
            });
    }

    return (
        <div className={styles.Screen}>
            <Container component='main' className={styles.Container}>
                <CssBaseline />
                <StyledBox>
                    <Typography variant="h6">Register</Typography>
                    <form
                        noValidate
                        autoComplete='off'
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                                e.preventDefault();
                            }
                        }}
                    >
                        <Grid container>
                            <Grid item xs={12} >
                                <CustomTextField
                                    name="description"
                                    onChange={handleChange}
                                    label="Description"
                                    fullWidth
                                    required
                                    multiline
                                    margin='normal'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <InsertDriveFile />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="experience"
                                    onChange={handleChange}
                                    label="Experience(Years)"
                                    type="number"
                                    margin='normal'
                                    fullWidth
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <School />
                                            </InputAdornment>
                                        ),
                                        inputProps: {
                                            min: 0,
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="Online"
                                    margin='normal'
                                    onChange={handleSessionChange}
                                    label="Online Fee(Rs.)"
                                    type="number"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Money />
                                            </InputAdornment>
                                        ),
                                        inputProps: {
                                            min: 1000,
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="Clinic"
                                    margin='normal'
                                    onChange={handleSessionChange}
                                    label="Clininc Fee(Rs.)"
                                    type="number"
                                    fullWidth
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Money />
                                            </InputAdornment>
                                        ),
                                        inputProps: {
                                            min: 1000,
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="specialization"
                                    onChange={handleChange}
                                    label="Specialization"
                                    fullWidth
                                    margin='normal'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Category />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="location"
                                    onChange={handleChange}
                                    label="Clininc Location"
                                    margin='normal'
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationOn />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="gray">Services</Typography>
                                <Button onClick={handleAddService} startIcon={<AddCircleOutline />}>Add Service</Button>
                                {showServiceInput && (
                                    <Grid container>
                                        <Grid item xs={12} mb={1} sm={10}>
                                            <TextField
                                                value={currentService}
                                                onChange={handleServiceChange}
                                                label="Service"
                                                margin='normal'
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LocalHospital />
                                                        </InputAdornment >
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} mb={1} sm={10}>
                                            <StyledButton onClick={handleServiceSubmit} variant="contained" color="secondary" fullWidth> Add </StyledButton>
                                        </Grid>
                                    </Grid>
                                )}
                                <Grid container marginTop='0.1rem'>
                                    {doctor.services.map((service, index) => (
                                        <Grid item key={index} mr={1} mb={1}>
                                            <Chip
                                                label={service}
                                                onDelete={() => handleRemoveService(service)}
                                                color="primary"
                                                variant="outlined"
                                                margin='normal'
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="gray">Appointment Slots</Typography>
                                <Button onClick={handleAddAppointmentSlot} startIcon={<AddCircleOutline />}>Add Appointment Slots</Button>
                                {showAppointmentInput && (
                                    <Grid item container justifyContent={'space-between'} xs={10}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Grid item xs={5}>
                                                <DatePicker
                                                    name="date"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    label="Date"
                                                    maxDate={dayjs(new Date())}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            margin: 'normal',
                                                            InputProps: {
                                                                startAdornment: (
                                                                    <Hidden xsUp>
                                                                        <InputAdornment position="start">
                                                                            <CalendarToday />
                                                                        </InputAdornment>
                                                                    </Hidden>
                                                                ),
                                                            }
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                        </LocalizationProvider>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <Grid item xs={5}>
                                                <TimePicker
                                                    value={selectedTime}
                                                    onChange={handleTimeChange}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            margin: 'normal',
                                                            label: 'Time',
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                        </LocalizationProvider>
                                        <Grid container spacing={2} p={3} pt={0}>
                                            <Grid item xs={10}>
                                                <Typography variant="subtitle1" color="grey" fontSize={14}>Slot Type</Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Paper
                                                    elevation={selectedType === 'Online' ? 4 : 1}
                                                    style={{ padding: '5px', borderRadius: '5px', cursor: 'pointer' }}
                                                    onClick={() => setSelectedType('Online')}
                                                >
                                                    <IconButton color={selectedType === 'Online' ? 'primary' : 'default'}>
                                                        <VideoCallIcon fontSize="large" />
                                                        <Typography variant="subtitle1">Online</Typography>
                                                    </IconButton>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Paper
                                                    elevation={selectedType === 'Clinic' ? 4 : 1}
                                                    style={{ padding: '5px', borderRadius: '5px', cursor: 'pointer' }}
                                                    onClick={() => setSelectedType('Clinic')}
                                                >
                                                    <IconButton color={selectedType === 'Clinic' ? 'primary' : 'default'}>
                                                        <LocalHospitalIcon fontSize="large" />
                                                        <Typography variant="subtitle1">Clinic</Typography>
                                                    </IconButton>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <StyledButton onClick={handleAppointmentSlotSubmit} variant="contained" color="secondary" fullWidth> Add </StyledButton>
                                        </Grid>
                                    </Grid>
                                )}
                                <Grid container spacing={2} marginTop='0.1rem'>
                                    {doctor.appointmentSlots.map((appointment, index) => (
                                        <Grid item key={index}>
                                            <Chip
                                                onDelete={() => handleRemoveAppointment(appointment)}
                                                color="primary"
                                                variant="outlined"
                                                label={`${dayjs(appointment.date).format('DD/MM/YYYY')} | ${appointment.time} | ${appointment.type}`}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" color="gray">Certificates</Typography>
                                <Button onClick={handleAddCertificate} startIcon={<AddCircleOutline />}>Add Certificate</Button>
                                {showCertificateInput && (
                                    <Grid container spacing={2}>
                                        <Grid item xs={10}>
                                            <TextField
                                                name="name"
                                                value={currentCertificate.name}
                                                onChange={handleCertificateChange}
                                                label="Name"
                                                fullWidth
                                                margin='normal'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Description />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <CustomTextField
                                                name="description"
                                                value={currentCertificate.description}
                                                onChange={handleCertificateChange}
                                                label="Description"
                                                fullWidth
                                                multiline
                                                margin='normal'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <InsertDriveFile />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <Grid item xs={10}>
                                                <DatePicker
                                                    name="issueDate"
                                                    value={currentCertificate.issueDate}
                                                    onChange={handleCertificateIssueDateChange}
                                                    label="Issue Date"
                                                    maxDate={dayjs(new Date())}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            margin: 'normal',
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <DatePicker
                                                    name="expiryDate"
                                                    value={currentCertificate.expiryDate}
                                                    onChange={handleCertificateExpiryDateChange}
                                                    label="Expiry Date"
                                                    minDate={currentCertificate.issueDate}
                                                    maxDate={dayjs(new Date())}
                                                    slotProps={{
                                                        textField: {
                                                            fullWidth: true,
                                                            margin: 'normal',
                                                            InputProps: {
                                                                startAdornment: (
                                                                    <InputAdornment position="start">
                                                                        <IconButton onClick={() => setCurrentCertificate({ ...currentCertificate, expiryDate: null })}>
                                                                            <Typography variant="body2" color="error">Clear</Typography>
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                ),
                                                            }
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                        </LocalizationProvider>
                                        <Grid container spacing={3}>
                                            <Grid item xs={5}>
                                                <Button variant="contained" component="label" fullWidth margin='normal' startIcon={<UploadFile />} sx={{ mt: 2, mb: 2, ml: 2 }}>
                                                    Upload
                                                    <input
                                                        type="file"
                                                        name="file"
                                                        onChange={handleCertificateFileChange}
                                                        hidden
                                                        required
                                                        accept="image/png, image/jpeg, image/jpg,.pdf"
                                                    />
                                                </Button>
                                            </Grid>
                                            {currentCertificate.file && (
                                                <Grid item xs={5}>
                                                    <Box display="flex" alignItems="center" height="100%" justifyContent="center">
                                                        <Chip
                                                            icon={<Description />}
                                                            label={`${currentCertificate.file.name}`}
                                                            clickable
                                                            color="primary"
                                                            variant="outlined"
                                                            component="a"
                                                            sx={{ mt: 2, mb: 2 }}
                                                            href="#"
                                                            onClick={e => { e.preventDefault(); openDialog(); }}
                                                            onDelete={handleRemoveCertificateFileChange}
                                                        />
                                                        <Dialog
                                                            open={dialogOpen}
                                                            onClose={closeDialog}
                                                            aria-labelledby="file-dialog-title"
                                                            aria-describedby="file-dialog-description"
                                                            maxWidth="md"
                                                            fullWidth
                                                            PaperProps={{
                                                                sx: {
                                                                    position: 'relative',
                                                                    backgroundColor: 'transparent',
                                                                    '&::before': {
                                                                        content: '""',
                                                                        position: 'absolute',
                                                                        top: 0,
                                                                        left: 0,
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        backgroundColor: 'white',
                                                                        opacity: 0.7,
                                                                        zIndex: -1,
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            <DialogTitle id="file-dialog-title" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                                <Typography variant="h7" fontSize={18} fontWeight={600}>Certificate File</Typography>
                                                                <IconButton aria-label="close" onClick={closeDialog} sx={{ position: 'absolute', right: 8 }}>
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </DialogTitle>
                                                            <DialogContent sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                overflow: 'auto',
                                                                height: 'auto',
                                                                padding: '2.5rem',
                                                            }}
                                                            >
                                                                {currentCertificate.file.type.startsWith('image/') ? (
                                                                    <Box
                                                                        component="img"
                                                                        src={URL.createObjectURL(currentCertificate.file)}
                                                                        title="Certificate File"
                                                                        sx={{
                                                                            maxWidth: '100%',
                                                                            maxHeight: '100%',
                                                                            objectFit: 'contain',
                                                                            border: 'none',
                                                                            marginBottom: '1rem',
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <>
                                                                        <Hidden smDown>
                                                                            <Box
                                                                                component="iframe"
                                                                                src={URL.createObjectURL(currentCertificate.file)}
                                                                                title="Certificate File"
                                                                                sx={{
                                                                                    width: '100%',
                                                                                    height: '70vh',
                                                                                    border: 'none',
                                                                                    marginBottom: '1rem',
                                                                                }}
                                                                            />
                                                                        </Hidden>
                                                                    </>
                                                                )}
                                                                <Button
                                                                    variant='contained'
                                                                    startIcon={<DownloadIcon />}
                                                                    onClick={downloadFile}
                                                                >
                                                                    Download PDF
                                                                </Button>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </Box>
                                                </Grid>
                                            )}
                                        </Grid>
                                        <Grid item xs={10}>
                                            <StyledButton onClick={handleCertificateSubmit} variant="contained" color="secondary" fullWidth> Add </StyledButton>
                                        </Grid>
                                    </Grid>
                                )}
                                <Grid container spacing={2} marginTop='0.1rem'>
                                    {doctor.certificates.map((certificate, index) => (
                                        <Grid item key={index}>
                                            <Chip
                                                label={certificate.name}
                                                onDelete={() => handleRemoveCertificate(certificate)}
                                                color="primary"
                                                variant="outlined"
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth margin="normal">Register</Button>
                            </Grid>
                        </Grid>
                    </form>
                </StyledBox>
            </Container>
        </div>
    );
}

export default RegisterDoctor;