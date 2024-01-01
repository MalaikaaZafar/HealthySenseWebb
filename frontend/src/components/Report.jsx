import React, { useState } from "react";
import { red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/material";
import api from "../services/api";


const addComplaint = async (patId, complaint) => {
    try {
        const body = {
            description: complaint,

        };
        const res = await api.post(`/doctor/complaint/${patId}`, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(res);
        if (res.status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

function Report({ id }) {
    const [open, setOpen] = useState(false);
    const [complaint, setComplaint] = useState('');

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarIcon, setSnackbarIcon] = useState(null);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const handleReport = async () => {
        if (complaint === '' || complaint === null || complaint?.trim() === '') {
            setSnackbarIcon(<ErrorOutlineIcon />);
            setSnackbarMessage('Empty complaint cannot be registered.');
            setSnackbarOpen(true);
            return;
        }
        const result = await addComplaint(id, complaint);
        console.log(result);
        if (result) {
            setSnackbarIcon(<CheckCircleOutlineIcon />);
            setSnackbarMessage('Your complaint has been registered.');
        } else {
            setSnackbarIcon(<ErrorOutlineIcon />);
            setSnackbarMessage('An error occurred while registering your complaint.');
        }
        setSnackbarOpen(true);
        setOpen(false);
        setComplaint('');

    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                style={{ background: red[500], width: '20%', textTransform: 'none', borderRadius: '10px' }}>Report</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', paddingBottom: 2 }}>Report User</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ paddingBottom: 10 }}>
                        Please enter your complaint against this user.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="complaint"
                        label="Complaint"
                        type="text"
                        fullWidth
                        value={complaint}
                        onChange={e => setComplaint(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={styles.button} onClick={handleClose}>Cancel</Button>
                    <Button sx={styles.button} onClick={handleReport}>Report</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                ContentProps={{
                    sx: { backgroundColor: '#2854c3', color: 'white' }
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={
                    <Box display="flex" alignItems="center" justifyContent="center">
                        {snackbarIcon}
                        {snackbarMessage}
                    </Box>
                }
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </>
    );
}

const styles = {
    button: {
        background: '#2854c3',
        color: 'white',

        width: '20%',
        textTransform: 'none',
        borderRadius: '10px',

        // hover
        '&:hover': {
            background: '#1f3d7a',
        },

    }
}
export default Report;