import React, { useState, useEffect } from 'react';
import {
    Button,
    Typography,
    Box,
    Container,
    Grid,
    Paper,
    CircularProgress,
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Divider,
    Hidden,
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import School from '@mui/icons-material/School';
import ViewListIcon from '@mui/icons-material/ViewList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarRatings from 'react-star-ratings';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import styles from './DoctorDetail.module.css';
import { styled } from '@mui/system';
import api from '../../services/api';
import Ban from '../../components/Ban';

const BlackLinearProgress = styled(LinearProgress)({
    '& .MuiLinearProgress-bar': {
        backgroundColor: '#000000',
    },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

function DoctorDeatils({ type }) {

    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentCertificate, setCurrentCertificate] = useState({
        name: '',
        file: null
    });
    const { docId } = useParams();
    const [banClickCount, setBanClickCount] = useState(0);

    const handleBanClick = () => {
        setBanClickCount(prevCount => prevCount + 1);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const url = process.env.REACT_APP_SERVER_URL;

    const handleCertificateChange = async (certificate) => {
        try {
            const response = await api.get(`/uploads/${certificate.file}`, { responseType: 'blob' });
            setCurrentCertificate({
                name: certificate.name,
                file: new File([response.data], certificate.file, { type: response.data.type })
            });
            openDialog();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    const [doctor, setDoctor] = useState({
        name: "",
        specialization: "",
        rating: 0,
        experience: 0,
        patients: 0,
        certifications: [],
        services: [],
        reviews: [],
        staffRating: 0,
        clinicRating: 0,
        checkupRating: 0,
        description: "",
        fees: 0,
        location: "",
        availability: false,
        verified: false,
        image: null,
    });

    useEffect(() => {

        console.log(type);

        const fetchData = () => {
            console.log("cookie: ", document.cookie);
            api.get(`/doctor-detail/${docId}`, { withCredentials: true })
                .then(res => {
                    console.log(res.data);
                    const doctorData = {
                        ...res.data,
                        certificate: res.data.certificate || [],
                        services: res.data.services || [],
                    };
                    setDoctor(doctorData);
                })
                .catch(err => {
                    console.log(err);
                    alert(err.response.data.message);
                });
        };

        fetchData();

    }, [banClickCount]);

    const handleVerifyDoctor = () => {
        api.post(`/verify/${docId}`)
            .then(res => {
                window.location.reload();
            }
            )
            .catch(err => {
                console.log(err);
                alert(err.response.data.message);
            }
            );
    }

    return (
        <div>
            <Container>
                <Box className={styles.bigPane} p={3}>
                    <Grid container spacing={3} justifyContent={'center'}>
                        <Grid item xs={12} sm={6} md={doctor.name.length > 20 || doctor.specialization.length > 20 ? 4 : 3}>
                            <Paper className={styles.innerBigPane1}>
                                <Box display="flex" alignItems="center" marginLeft={2} height={100} pr={2} justifyContent={'center'} >
                                    <Box marginBottom={2}>
                                        {doctor.image ? (
                                            <StyledAvatar src={`${url}/uploads/${doctor.image}`} alt="Profile Picture" />
                                        ) : (
                                            <StyledAvatar src="/images/photo.png" />
                                        )}
                                    </Box>
                                    <Box ml={2} mt={-2}>
                                        <Typography variant="h7" color={'black'} fontWeight={'bold'}>
                                            {doctor.name}
                                        </Typography>
                                        <Typography variant="body2" fontSize={12} color="textSecondary" mt={1}>
                                            {doctor.specialization}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Paper className={styles.innerBigPane1}>
                                <Box display="flex" alignItems="center" height={100} flexDirection={'column'} justifyContent={'center'} >
                                    <PeopleIcon fontSize="large" color="black" />
                                    <Typography variant="h7">{doctor.patients}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Patients
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Paper className={styles.innerBigPane1}>
                                <Box display="flex" alignItems="center" height={100} flexDirection={'column'} justifyContent={'center'} >
                                    <School fontSize="large" color="black" />
                                    <Typography variant="h7">{doctor.experience}+ Years</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Experience
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={2}>
                            <Paper className={styles.innerBigPane1}>
                                <Box display="flex" alignItems="center" height={100} flexDirection={'column'} justifyContent={'center'} >
                                    <StarRatings
                                        rating={(doctor.rating / 5.0)}
                                        starRatedColor="black"
                                        numberOfStars={1}
                                        name='rating'
                                        starDimension="30px"
                                    />
                                    <Typography variant="h7">{doctor.rating}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Ratings
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container alignItems={'center'} mt={3} justifyContent={'center'}>
                        <Grid item xs={12} sm={3}>
                            <Grid container alignItems={'center'} spacing={1}>
                                <Grid item xs={3}>
                                    <Box position="relative" display="inline-flex">
                                        <CircularProgress variant="determinate" value={(doctor.rating / 5.0 * 100)} style={{ color: 'black' }} size={50} />
                                        <Box
                                            top={0}
                                            left={0}
                                            bottom={0}
                                            right={0}
                                            position="absolute"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            mr={1}
                                        >
                                            <Typography variant="subtitle1" fontWeight="bold" component="div" color="textSecondary" marginLeft={1}>
                                                {`${Math.round((doctor.rating / 5.0 * 100))}%`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Typography variant="subtitle1" fontWeight="bold">Satisfied patients</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={8} mt={1} ml={1}>
                            <Grid container alignItems={'center'}>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="body2" color="textSecondary">
                                        Doctor Checkup
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} md={6} mr={3}>
                                    <Grid container direction="column">
                                        <BlackLinearProgress value={doctor.checkupRating} variant="determinate" className={styles.linearProgress} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} md={1}>
                                    <Typography variant="body2" color="textSecondary">{`${doctor.checkupRating}%`}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container alignItems={'center'}>
                                <Grid item xs={12} md={3} >
                                    <Typography variant="body2" color="textSecondary">
                                        Clinical facility
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} md={6} mr={3}>
                                    <Grid container direction="column">
                                        <BlackLinearProgress value={doctor.clinicRating} variant="determinate" className={styles.linearProgress} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} md={1}>
                                    <Typography variant="body2" color="textSecondary">{`${doctor.clinicRating}%`}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container alignItems={'center'}>
                                <Grid item xs={12} md={3}>
                                    <Typography variant="body2" color="textSecondary">
                                        Staff Behaviour
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} md={6} mr={3}>
                                    <Grid container direction="column">
                                        <BlackLinearProgress value={doctor.staffRating} variant="determinate" className={styles.linearProgress} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} md={1}>
                                    <Typography variant="body2" color="textSecondary">{`${doctor.staffRating}%`}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button onClick={handleClickOpen} startIcon={<ViewListIcon />} style={{ marginTop: '20px' }}>View Certifications</Button>
                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'}>
                        <DialogTitle alignContent={'center'}>Doctor Certifications</DialogTitle>
                        <DialogContent>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell>Name</StyledTableCell>
                                            <StyledTableCell>File</StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {doctor.certifications.length > 0 ? doctor.certifications.map((certification, index) => (
                                            <StyledTableRow key={index}>
                                                <TableCell>{certification.name}</TableCell>
                                                <TableCell>
                                                    <MuiLink component={RouterLink} href="" color="primary" underline="none" onClick={() => handleCertificateChange(certification)}>
                                                        Certificate {index + 1}
                                                    </MuiLink>
                                                </TableCell>
                                            </StyledTableRow>
                                        )) :
                                            <StyledTableRow>
                                                <TableCell>No Certifications</TableCell>
                                            </StyledTableRow>
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </DialogContent>
                    </Dialog>
                    {currentCertificate.file &&
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
                                        opacity: { xs: 1, sm: 0.7 },
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
                                    Download
                                </Button>
                            </DialogContent>
                        </Dialog>
                    }
                    <Grid container p={3} bgcolor='#eff6fc' mt={3} borderRadius={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="text.secondary" gutterBottom fontWeight={'bold'} fontSize={18}>
                                About Doctor
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom fontSize={14}>
                                {doctor.description}
                            </Typography>
                        </Grid>
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item xs={12} md={8} container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" color="text.secondary" gutterBottom fontWeight={'bold'} fontSize={18}>
                                        Services
                                    </Typography>
                                    {doctor.services.map((service, index) => (
                                        <Typography key={index} variant="body2" color="text.secondary" gutterBottom fontSize={14}>
                                            ✨ {service}
                                        </Typography>
                                    ))}
                                </Grid>
                                <Grid item xs={12} mt={2}>
                                    {type === 'patient' &&
                                        <Button variant="contained" color="primary" fullWidth>
                                            Book Appointment
                                        </Button>
                                    }
                                    {type === 'admin' && !doctor.verified &&
                                        <>
                                            {doctor.isBanned ? <Ban text={'Unban Doctor'} onChange={handleBanClick} /> : <Ban text={'Ban Doctor'} onChange={handleBanClick} />}
                                            <Button variant="contained"
                                                sx={{ marginLeft: '10px', width: '20%', textTransform: 'none', borderRadius: '10px', alignSelf: 'center' }}
                                                fullWidth
                                                onClick={() => handleVerifyDoctor()}
                                            >
                                                Verify Doctor
                                            </Button>
                                        </>
                                    }

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box p={2} bgcolor={'#ffffff'} borderRadius={2}>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" mt={1}>
                                            <Grid item xs={2}>
                                                <Typography variant="h6" color="text.secondary" gutterBottom fontSize={14} fontWeight={'bold'}>
                                                    Fee:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography variant="body2" color="text.secondary" gutterBottom fontSize={14} align='right'>
                                                    {doctor.fees}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                        <Grid container mt={3} alignItems="center">
                                            <Grid item xs={1}>
                                                <LocationOnIcon color="action" />
                                            </Grid>
                                            <Grid item xs={12} md={2} ml={1}>
                                                <Typography variant="h6" color="text.secondary" gutterBottom fontSize={14} fontWeight={'bold'}>
                                                    Address:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="body2" color="text.secondary" gutterBottom fontSize={14} align='right'>
                                                    {doctor.location}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                        <Grid container alignItems="center" mt={2}>
                                            <Grid item md={1}>
                                                <CheckCircleIcon color="success" />
                                            </Grid>
                                            <Grid item xs={12} md={10} ml={1}>
                                                <Typography variant="h6" color="text.secondary" gutterBottom fontSize={14} fontWeight={'bold'}>
                                                    <span style={{ color: '#26b937' }}>{doctor.availability ? 'Available' : 'Not Available'}</span>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    {doctor.reviews.length > 0 && (
                        <>
                            <Typography variant="h6" color="text.primary" mb={2} mt={3} fontWeight={'bold'} fontSize={18}>
                                Latest Reviews
                            </Typography>
                            {doctor.reviews.sort((a, b) => new Date(b.date) - new Date(a.date)).map((review, index) => (
                                <Paper key={index} sx={{ p: 3, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 2, boxShadow: 3 }}>
                                    <Typography variant="body1" color="text.secondary" sx={{ pr: 2, fontSize: 14, fontWeight: 'bold' }}>
                                        {review.comment}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <StarRatings
                                                rating={review.experience / 5}
                                                starRatedColor="black"
                                                numberOfStars={1}
                                                name='rating'
                                                starDimension="20px"
                                            />
                                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontSize: 14, fontWeight: 'bold' }}>
                                                {review.experience}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            ))}
                        </>
                    )}
                </Box>
            </Container>
        </div >
    );
}

export default DoctorDeatils;