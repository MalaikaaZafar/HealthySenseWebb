import { Button, IconButton, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useParams } from "react-router-dom";
import { red } from '@mui/material/colors';
import { useState } from "react";
import { useEffect } from "react";
import banUser from "../services/banUser";


export default function Ban({ text, onChange }) {
    const { docId: id } = useParams();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarIcon, setSnackbarIcon] = useState(null);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };


    const handleBan = async () => {
        const result = await banUser(id);
        console.log(result);
        if (result) {
            setSnackbarIcon(<CheckCircleOutlineIcon />);
            setSnackbarMessage('User has been banned.');
            onChange();
        } else {
            setSnackbarIcon(<ErrorOutlineIcon />);
            setSnackbarMessage('An error occurred while banning the user.');
        }
        setSnackbarOpen(true);
    }
    return (
        <>
            <Button
                variant="contained"
                onClick={handleBan}
                style={{ background: red[500], width: '20%', textTransform: 'none', borderRadius: '10px', alignSelf: 'center' }}>
                {text}
            </Button>
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
    )
}