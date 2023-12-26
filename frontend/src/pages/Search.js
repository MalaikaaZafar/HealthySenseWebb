import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, IconButton } from '@mui/material';
import TextRotationNoneIcon from '@mui/icons-material/TextRotationNone';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import DoctorCard from '../components/DoctorCard';
import searchDoctors from '../services/searchDoctors';
import FilterPopover from '../components/FilterPopover';
import './Search.css';
import styles from '../styles/searchStyles';
import useUserStore from '../stores/userStore';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';


const Search = () => {

    const [selectedButton, setSelectedButton] = React.useState('A-Z');
    const [sortDirection, setSortDirection] = React.useState('asc');
    const [searchText, setSearchText] = React.useState('');
    const [doctors, setDoctors] = React.useState([]);
    const [specialtyFilter, setSpecialtyFilter] = React.useState('');
    const [minRating, setMinRating] = React.useState(0);
    const { updateUser } = useUserStore();
    const [notFound, setNotFound] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // ...

    const fetchMoreData = async () => {
        //   if (doctors.length >= 100) {
        //     setHasMore(false);
        //     return;
        //   }
        console.log("fetching more data")
        const skip = doctors.length;
        let moreDoctors = await searchDoctors(searchText, selectedButton, sortDirection, specialtyFilter, minRating, skip);
        if (moreDoctors.length === 0) {
            setHasMore(false);
            return;
        }
        setDoctors(doctors.concat(moreDoctors));
    };

    useEffect(() => {
        updateUser();
    }, []);

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
        let doctors = await searchDoctors(searchText, selectedButton, sortDirection, specialtyFilter, minRating);

        setDoctors(doctors);
        if (doctors.length === 0) {
            setNotFound(true);
        }
        else {
            setNotFound(false);
        }



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
                    {doctors.length > 0 && <h4 style={{ flexGrow: 1, marginTop: 2 }}>Showing {doctors?.length} results</h4>}
                </Box>
            </Box>
            {doctors.length > 0 ? <InfiniteScroll
                dataLength={doctors.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={doctors && doctors.length > 3 ? <h4 style={{ textAlign: 'center' }}>Loading...</h4> : null}

                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>No more doctors, We couldn't find a suitable doctor for you :(</b>
                    </p>
                }
                style={{ overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}

            >
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', p: 2, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
                    {doctors?.length > 0 && doctors.map((doctor) => {
                        return (
                            <DoctorCard user={doctor} buttons={true} />
                        );
                    })}
                </Box>
            </InfiniteScroll>
                :

                (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                    <img src={require("../assets/images/noResults.png")} alt="loading" style={{ width: '25%', height: '25%', p: 0 }} />
                    <h1 style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold' }}>{notFound ? 'No Doctors Found' : 'Search for a doctor'}</h1>
                    <h4 style={{ textAlign: 'center', fontSize: 20, fontWeight: 'normal' }}>{notFound ? `Try searching for something else or making sure there aren't any typos` : 'Search for a doctor, and filter by specialty or rating'}</h4>
                </div>)
            }
        </div >
    );
};

export default Search;

