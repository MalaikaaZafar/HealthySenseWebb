import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, TextField, IconButton, CircularProgress } from '@mui/material';
import TextRotationNoneIcon from '@mui/icons-material/TextRotationNone';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import DoctorCard from '../../components/DoctorCard';
import searchDoctors from '../../services/searchDoctors';
import FilterPopover from '../../components/FilterPopover';
import './Search.css';
import styles from '../../styles/searchStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchErrorMessage from '../../components/SearchErrorMessage';
import fetchFavorites from '../../services/fetchFavorites';

const Search = () => {

    const [selectedButton, setSelectedButton] = React.useState('A-Z');
    const [sortDirection, setSortDirection] = React.useState('asc');
    const [searchText, setSearchText] = React.useState('');
    const [doctors, setDoctors] = React.useState([]);
    const [specialtyFilter, setSpecialtyFilter] = React.useState('');
    const [minRating, setMinRating] = React.useState(0);
    const [notFound, setNotFound] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [actionCompleted, setActionCompleted] = React.useState(true);
    const [error, setError] = React.useState(false);
    const initialRender = useRef(true);
    const [favorites, setFavorites] = useState([]);

    // ...

    const fetchMoreData = async () => {
        console.log("fetching more data")
        const skip = doctors.length;
        let moreDoctors = await searchDoctors(searchText, selectedButton, sortDirection, specialtyFilter, minRating, skip);
        if (moreDoctors.length === 0) {
            setHasMore(false);
            return;
        }
        setDoctors(doctors.concat(moreDoctors));
    };

    const onFavChange = async () => {
        await getFavs();
    }

    const getFavs = async () => {
        const res = await fetchFavorites();
        if (res === -1) {
            return;
        }
        console.log(res);
        setFavorites(res);
    };
    useEffect(() => {

        getFavs();
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        else
            searchPressed();
    }, [sortDirection]);

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
        setSortDirection(prevDirection => {
            const newDirection = prevDirection === 'asc' ? 'desc' : 'asc';
            return newDirection;
        });
    };

    const searchPressed = async (direction = sortDirection) => {
        // if (searchText === '') {
        //     alert('Please enter a search query');
        // }
        setActionCompleted(false);
        const result = await searchDoctors(searchText, selectedButton, sortDirection, specialtyFilter, minRating, 0);
        console.log(result);
        if (result == -1) {
            setError(true);
            setActionCompleted(true);
            return;
        }

        setDoctors(result);
        if (doctors.length === 0) {
            setNotFound(true);
        }
        else {
            setNotFound(false);
        }
        setActionCompleted(true);
        setError(false);
        setHasMore(true);


    };

    const isFavorite = (doctor) => {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i]._id === doctor._id) {
                return true;
            }
        }
        return false;
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
                        <IconButton
                            aria-label="sort direction"
                            onClick={toggleSortDirection}
                            disabled={!actionCompleted}
                            sx={{ ...styles.button, backgroundColor: '#2854c3' }}>
                            <TextRotationNoneIcon sx={sortDirection === 'asc' ? { color: 'white' } : { color: 'white', transform: 'scaleX(-1)' }} fontSize='small' />                        </IconButton>
                    </Box>
                    {doctors.length > 0 && <h4 style={{ flexGrow: 1, marginTop: 2 }}>Showing {doctors?.length} results</h4>}
                </Box>
            </Box>
            {doctors.length > 0 && !error ? <InfiniteScroll
                dataLength={doctors.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={doctors && doctors.length > 3 ? <CircularProgress style={{ height: '150px', width: '150px', color: '#2854c3' }} alt="Loading..." /> : null}

                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>No more doctors, We couldn't find a suitable doctor for you :(</b>
                    </p>
                }
                style={{ overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}

            >
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', p: 2, justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
                    {doctors?.length > 0 && doctors.map((doctor, index) => {
                        return (
                            isFavorite(doctor) ? <DoctorCard user={doctor} role='patient' buttons={true} key={index} isFav={true} onFavChanged={onFavChange} /> : <DoctorCard role='patient' user={doctor} buttons={true} key={index} onFavChanged={onFavChange} />
                        );
                    })}
                </Box>
            </InfiniteScroll>
                :
                <SearchErrorMessage notFound={notFound} error={error} role={'doctor'} />
            }
        </div >
    );
};

export default Search;

