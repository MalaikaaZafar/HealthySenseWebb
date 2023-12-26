import React from 'react';
import { Box, Button, TextField, IconButton } from '@mui/material';
import TextRotationNoneIcon from '@mui/icons-material/TextRotationNone';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import DoctorCard from '../Components/DoctorCard';
import searchDoctors from '../services/searchDoctors';
import FilterPopover from '../Components/FilterPopover';
import './Search.css';
import styles from '../styles/searchStyles';

const Search = () => {

    const [selectedButton, setSelectedButton] = React.useState('A-Z');
    const [sortDirection, setSortDirection] = React.useState('asc');
    const [searchText, setSearchText] = React.useState('');
    const [doctors, setDoctors] = React.useState([]);
    const [specialtyFilter, setSpecialtyFilter] = React.useState('');
    const [minRating, setMinRating] = React.useState(0);
    const handleButtonClick = (value) => {
        setSelectedButton((prevSelected) => {
            if (prevSelected === value) {
                return prevSelected;
            }
            searchPressed();
            return value;
        });
    };

    const handleSpecialtyFilter = (value) => {
        setSpecialtyFilter(value);
    };

    const handleMinRating = (value) => {
        setMinRating(value);
    };

    const handleSearch = (value) => {
        setSearchText(value);
    };

    const toggleSortDirection = () => {
        setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
        searchPressed();
    };

    const searchPressed = async () => {
        // if (searchText === '') {
        //     alert('Please enter a search query');
        // }
        const doctors = await searchDoctors(searchText, selectedButton, sortDirection, specialtyFilter, minRating);
        setDoctors(doctors);



    };
    return (
        <div style={{ marginTop: 50 }}>
            <Box sx={styles.container}>
                <Box sx={styles.searchBox}>
                    <Box sx={styles.searchBar}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            sx={styles.textField}
                            onChange={(e) => handleSearch(e.target.value)}
                            value={searchText}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    searchPressed();
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={searchPressed} sx={{ color: '#2854C3', padding: 0 }}>
                                            <SearchIcon fontSize='large' />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <FilterPopover handleFilterChange={handleSpecialtyFilter} handleMinRating={handleMinRating} specialty={specialtyFilter} minRating={minRating} onApply={searchPressed} />
                    </Box>
                    <Box sx={styles.buttonGroup}>
                        <Button variant='outlined' color="primary" onClick={() => handleButtonClick('A-Z')} sx={selectedButton === 'A-Z' ? { ...styles.button, backgroundColor: '#2854C3', color: '#fff' } : styles.button}>
                            A-Z
                        </Button>
                        <Button variant='outlined' color="primary" onClick={() => handleButtonClick('Price')} sx={selectedButton === 'Price' ? { ...styles.button, backgroundColor: '#2854C3', color: '#fff' } : styles.button}>
                            Price
                        </Button>
                        <Button variant='outlined' color="primary" onClick={() => handleButtonClick('Rating')} sx={selectedButton === 'Rating' ? { ...styles.button, backgroundColor: '#2854C3', color: '#fff' } : styles.button}>
                            Rating
                        </Button>
                        <IconButton aria-label="sort direction" onClick={toggleSortDirection} sx={{ ...styles.button, backgroundColor: '#2854c3' }}>
                            <TextRotationNoneIcon sx={sortDirection === 'asc' ? { color: 'white' } : { color: 'white', transform: 'scaleX(-1)' }} fontSize='small' />                        </IconButton>
                    </Box>
                    <h4 style={{ flexGrow: 1, marginTop: 2 }}>Showing {doctors?.length} results</h4>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', p: 2, marginTop: 2 }}>
                {doctors?.length > 0 && doctors.map((doctor) => {
                    return (
                        <DoctorCard user={doctor} buttons={true} />
                    );
                })}
            </Box>
        </div>
    );
};

export default Search;

