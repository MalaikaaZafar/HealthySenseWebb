import React, { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/system';
import {
    Button,
    TextField,
    Grid,
    Typography,
    InputAdornment,
    Chip,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    IconButton,
    Container,
    CssBaseline,
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
        workingHours: '',
        fee: '',
        services: [],
        appointmentSlots: [],
        certificates: [],
    });

    const [currentService, setCurrentService] = useState('');
    const [showServiceInput, setShowServiceInput] = useState(false);

    const [showAppointmentInput, setShowAppointmentInput] = useState(false);
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTime, setSelectedTime] = useState(new Date());

    const [currentCertificate, setCurrentCertificate] = useState({
        name: '',
        description: '',
        issueDate: dayjs(new Date()),
        expiryDate: null,
        file: null
    });
    const [showCertificateInput, setShowCertificateInput] = useState(false);

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

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleTimeChange = (newValue) => {
        setSelectedTime(newValue);
    };

    const handleAddAppointmentSlot = () => {
        if (!showAppointmentInput) {
            setShowAppointmentInput(true);
        } else {
            setShowAppointmentInput(false);
            setSelectedDay('');
            setSelectedTime(new Date());
        }
    };

    const checkAppointmentSlot = (appointmentSlot) => {
        const [day, time] = appointmentSlot.split(' ');
        const [hours, minutes] = time.split(':');
        const appointmentSlotTime = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

        for (let i = 0; i < doctor.appointmentSlots.length; i++) {
            const currentAppointmentSlot = doctor.appointmentSlots[i];
            const [currentDay, currentTime] = currentAppointmentSlot.split(' ');
            const [currentHours, currentMinutes] = currentTime.split(':');
            const currentAppointmentSlotTime = parseInt(currentHours, 10) * 60 + parseInt(currentMinutes, 10);
            if (
                (day === currentDay && Math.abs(appointmentSlotTime - currentAppointmentSlotTime) < 10) ||
                (day !== currentDay && (1440 - Math.abs(appointmentSlotTime - currentAppointmentSlotTime)) < 10)
            ) {
                return false;
            }
        }

        return true;
    };

    const handleAppointmentSlotSubmit = () => {
        if (selectedDay && selectedTime) {
            const formattedTime = format(selectedTime, 'HH:mm'); // Format time without seconds
            if (checkAppointmentSlot(`${selectedDay} ${formattedTime}`)) {
                const appointmentSlot = `${selectedDay} ${formattedTime}`;
                setDoctor(prevDoctor => ({ ...prevDoctor, appointmentSlots: [...prevDoctor.appointmentSlots, appointmentSlot] }));
                setSelectedDay('');
                setSelectedTime(new Date());
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

    const handleChange = (e) => {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(doctor).forEach(key => {
            if (key === 'certificates') {
                Array.from(doctor.certificates).forEach((file, index) => {
                    formData.append(`certificates[${index}]`, file);
                });
            } else if (key === 'services') {
                doctor.services.forEach((service, index) => {
                    formData.append(`services[${index}]`, service);
                });
            } else {
                formData.append(key, doctor[key]);
            }
        });

        try {
            const res = await axios.post('/api/doctors/register', formData);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={styles.Screen}>
            <Container component='main' className={styles.Container}>
                <CssBaseline />
                <StyledBox>
                    <Typography variant="h6">Register</Typography>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <CustomTextField
                                    name="description"
                                    onChange={handleChange}
                                    label="Description"
                                    fullWidth
                                    required
                                    multiline
                                    margin='normal'
                                    placeholder='Write about yourself'
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
                                    placeholder='Enter how many years of experience you have'
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
                                    name="fee"
                                    margin='normal'
                                    onChange={handleChange}
                                    label="Fee(Rs.)"
                                    type="number"
                                    fullWidth
                                    required
                                    placeholder='Enter your consultation fee in Rupees'
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
                                    placeholder='Enter your specialization'
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
                                    label="Location"
                                    margin='normal'
                                    fullWidth
                                    placeholder='Enter your clinic address'
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
                                    <Grid container spacing={2}>
                                        <Grid item xs={10}>
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
                                        <Grid item xs={10}>
                                            <StyledButton onClick={handleServiceSubmit} variant="contained" color="secondary" fullWidth> Add </StyledButton>
                                        </Grid>
                                    </Grid>
                                )}
                                <Grid container spacing={2} marginTop='0.1rem'>
                                    {doctor.services.map((service, index) => (
                                        <Grid item key={index}>
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
                                    <Grid container spacing={2}>
                                        <Grid item xs={5}>
                                            <FormControl fullWidth margin='normal'>
                                                <InputLabel>Day</InputLabel>
                                                <Select
                                                    value={selectedDay}
                                                    onChange={handleDayChange}
                                                    label="Day"
                                                    startAdornment={
                                                        <InputAdornment position='start'>
                                                            <CalendarToday />
                                                        </InputAdornment>
                                                    }
                                                >
                                                    <MenuItem value={'Monday'}>Monday</MenuItem>
                                                    <MenuItem value={'Tuesday'}>Tuesday</MenuItem>
                                                    <MenuItem value={'Wednesday'}>Wednesday</MenuItem>
                                                    <MenuItem value={'Thursday'}>Thursday</MenuItem>
                                                    <MenuItem value={'Friday'}>Friday</MenuItem>
                                                    <MenuItem value={'Saturday'}>Saturday</MenuItem>
                                                    <MenuItem value={'Sunday'}>Sunday</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
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
                                        <Grid item xs={10}>
                                            <StyledButton onClick={handleAppointmentSlotSubmit} variant="contained" color="secondary" fullWidth> Add </StyledButton>
                                        </Grid>
                                    </Grid>
                                )}
                                <Grid container spacing={2} marginTop='0.1rem'>
                                    {doctor.appointmentSlots.map((appointment, index) => (
                                        <Grid item key={index}>
                                            <Chip
                                                label={appointment}
                                                onDelete={() => handleRemoveAppointment(appointment)}
                                                color="primary"
                                                variant="outlined"
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
                                                    <input type="file" name="file" onChange={handleCertificateFileChange} hidden required />
                                                </Button>
                                            </Grid>
                                            {currentCertificate.file && (
                                                <Grid item xs={5}>
                                                    <Box display="flex" alignItems="center" height="100%" justifyContent="center">
                                                        {currentCertificate.file.type.startsWith('image/') ? (
                                                            <img src={URL.createObjectURL(currentCertificate.file)} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
                                                        ) : (
                                                            <Chip
                                                                icon={<Description />}
                                                                label={`${currentCertificate.file.name}`}
                                                                clickable
                                                                color="primary"
                                                                variant="outlined"
                                                                component="a"
                                                                sx={{ mt: 2, mb: 2 }}
                                                                href={URL.createObjectURL(currentCertificate.file)}
                                                                download={currentCertificate.file.name}
                                                            />
                                                        )}
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