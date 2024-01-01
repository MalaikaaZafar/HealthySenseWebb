import React, { useEffect } from 'react';
import { Box, Button, Popover, Select, MenuItem, FormControl, InputLabel, IconButton, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import Slider from '@mui/material/Slider';
import fetchSpecialties from '../services/fetchSpecialties';
import styles from '../styles/searchStyles';





const FilterPopover = ({ specialty, handleFilterChange, handleMinRating, minRating, onApply, isPatient }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [specializations, setSpecializations] = React.useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const specialties = await fetchSpecialties();
            setSpecializations(specialties);
        }
        if (isPatient == undefined || isPatient == false) {
            fetchData();
        }
        else {
            setSpecializations(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
        }

    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton aria-describedby={id} onClick={handleClick} sx={styles.filter}>
                <TuneIcon /> Filters
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{ marginTop: 1 }}
                slotProps={{
                    paper: {
                        style: { borderRadius: 5, backgroundColor: 'transparent', boxShadow: 'none' },
                    },
                }}
            >
                <Box sx={{ ...styles.filterContainer }}>
                    <FormControl fullWidth>
                        <InputLabel id="specialty-label">{isPatient == undefined || isPatient == false ? "Specialty" : "Blood Group"}</InputLabel>
                        <Select
                            labelId="specialty-label"
                            id="specialty-select"
                            value={specialty}
                            label="Specialty"
                            onChange={(e) => handleFilterChange(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {specializations.length > 0 && specializations.map((specialization, index) => {
                                return <MenuItem value={specialization} key={index} >{specialization}</MenuItem>;
                            })}
                        </Select>
                    </FormControl>
                    {minRating !== undefined && (
                        <FormControl fullWidth sx={{ marginTop: 2 }}>
                            <Typography id="min-rating-label" gutterBottom sx={styles.label}>
                                Minimum Rating
                            </Typography>
                            <Slider
                                value={minRating}
                                onChange={(e, value) => handleMinRating(value)}
                                aria-labelledby="min-rating-label"
                                valueLabelDisplay="auto"
                                marks
                                min={0}
                                max={5}
                                sx={{
                                    color: '#2854C3',
                                    '& .MuiSlider-thumb': {
                                        backgroundColor: '#2854C3',
                                    },
                                    '& .MuiSlider-mark': {
                                        backgroundColor: '#2854C3',
                                    },
                                    '& .MuiSlider-markActive': {
                                        backgroundColor: '#2854C3',
                                    },
                                    '& .MuiSlider-valueLabel': {
                                        color: '#fff',
                                    },
                                }}
                            />
                        </FormControl>
                    )}
                    <Button variant="contained" sx={styles.applyButton} onClick={onApply}>
                        Apply
                    </Button>
                </Box>
            </Popover>
        </div>
    );
};

export default FilterPopover;